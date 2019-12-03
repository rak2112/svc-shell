const { Job, Group } = require("brigadier");
const devops = require("devops-brigade");

// TODO: The notifyInfoAsync method requires a Microsoft Teams webhook - see
// https://confluence-engineering.dentsuaegis.com/display/GD/Send+notifications+to+Teams+channel
// or comment them out until ready

class JobFactory {
  createBuildJob(e, project) {
    // TODO: If not "node", specify alternative docker container for your build
    var build = new Job("build", "node");
    build.storage.enabled = true;

    let taskFactory = new devops.BuildTaskFactory(e, project);
    build.tasks = [
      "cd /src",

      taskFactory.gitVersion(),

      // TODO: Remove npmVersion if NOT a node project
      taskFactory.npmVersion(),

      // Build
      "git config --global credential.helper 'store'",
      `echo https://${project.secrets.giteauser}:${project.secrets.giteapass}@gitea-tooling.az.devops.gdpdentsu.net > ~/.git-credentials`,
      "rm -rf node_modules",
      "npm install",
      "npm run build",
      taskFactory.storeBuild()
    ];

    return build;
  }

  createDeployJob(teamEnv, e, project) {
    let deployTaskFactory = new devops.DeployTaskFactory(teamEnv, e, project);
    let deployJob = new Job(`deploy-${teamEnv}`, `globaldevopsreg11.azurecr.io/builder:latest`);
    deployJob.storage.enabled = true;

    // TODO: customise values based on your helm chart
    let values = {
      node_env: "dev",
      port: 10000,
      api_prefix: "/api",
      // authprovider_active: "false",
      authprovider_authentication_client_id: `${project.secrets[teamEnv + "_authprovider_authentication_client_id"]}`,
      authprovider_authentication_issuer: `${project.secrets[teamEnv + "_authprovider_authentication_issuer"]}`,
      // authprovider_authorization_allow_when_no_rule: "true",
      authprovider_authorization_application: "RFD",
      // authprovider_authorization_get_authorizations: "true",
      // authprovider_authorization_open_domain: "true",
      config_secret: `${project.secrets[teamEnv + '_config_secret']}`,
      debug: "true",
      redis_port: 6379,
      database: `${teamEnv}-catalog`,
      dbrole: "user",
      image: {
        tag: "${APP_VER}",
        repository: `${project.secrets.app_container_reg}/${devops.Utilities.getAppName()}`
      }
    };
    if (deployTaskFactory.getEnvSuffix() === "dev" || deployTaskFactory.getEnvSuffix() === "test") {
      // External team dependencies must be stubbed as they won't be accessible until "int" environment
      values.database = "catalog";
    }

    deployJob.tasks = [
      deployTaskFactory.loginToCluster(),
      deployTaskFactory.setAppVerEnv(),

      "cd /src/",
      deployTaskFactory.helmUpgradeInstallCommandWithValidation(
        `${teamEnv}`,
        `${teamEnv}-${project.secrets.app_name}`,
        `./helm/${project.secrets.app_name}`,
        values
      )
    ];

    return deployJob;
  }
}

// TODO: notification via teams on error - remove if not using teams
// devops.Events.enableNotifyOnError();

devops.Events.onPushDevelop(async (e, project) => {
  let jobFactory = new JobFactory();

  await jobFactory.createBuildJob(e, project).run();
  // TODO: add SonarQube integration https://confluence-engineering.dentsuaegis.com/display/GD/Sonarqube
  await devops.Standard.packageAsync();
  await jobFactory.createDeployJob(`${project.secrets.team_name}-dev`, e, project).run();
  await devops.Standard.approveAsync();
  await jobFactory.createDeployJob(`${project.secrets.team_name}-test`, e, project).run();
  await jobFactory.createDeployJob(`ds-taxonomy01-poc-g1ds`, e, project).run();
  await jobFactory.createDeployJob(`ds-planner01-poc-g1ds`, e, project).run();
  // TODO: customise the polling URL to match your endpoint,
  // remember svc.cluster.local addresses only allowed for envs on same cluster as CI
  // await devops.Standard.pollHealthAsync(`https://[yourteamenv]-[appname].az.[yourbase].gdpdentsu.net/api/health`);
  // TODO: add component tests against the dev environment here
  // await jobFactory.createDeployJob(`${project.secrets.team_name}-test`, e, project).run();
  // TODO: deploy to further environments such as "int" and run integration tests
  // TODO: upload integration test results

  // TODO: the following sends a notification via teams - remove if not using teams
  var semver = await devops.Utilities.getSemVerAsync();
  // await devops.Utilities.notifyInfoAsync(`Deployment to test complete`, `Deployed version ${semver}`);
});

devops.Events.onPushOther(async (e, project) => {
  new JobFactory().createBuildJob(e, project).run();
});

devops.Events.onDeploy(async (e, project, teamEnv, version) => {
  await new JobFactory().createDeployJob(teamEnv, e, project).run();
  await devops.Utilities.notifyInfoAsync(`Deployment`, `Deployment to ${teamEnv} of ${version} initiated`);
});

exports.JobFactory = JobFactory;
