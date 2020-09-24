# Codefresh

## Configuration

Codefresh stores all Allure reports in cloud storage. Current
integrations exist for Google Cloud and AWS buckets.

First go to your Account Configuration, by clicking on Account Settings
on the left sidebar. On the first section called Integrations scroll
down to Cloud Storage:

![Setup Test report location](../../images/codefresh_cloud_storage.png)

Click the configure button and in the following screen enter your cloud
settings according to your cloud provider. Make sure that you note down
your bucket name as it will be used later in the pipeline definition.

## Usage

Codefresh offers a plugin that can create your reports. The
[plugin](https://codefresh.io/docs/docs/codefresh-yaml/steps/freestyle/)
is just inserted on any [Codefresh
pipeline](https://codefresh.io/docs/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
and by default looks for test results in `allure-results`.

```yaml
 my_unit_test_reporting_step:
   title: Generate test reporting
   image: codefresh/cf-docker-test-reporting
   environment:
     - BUCKET_NAME=my-bucket-name
     - CF_STORAGE_INTEGRATION=google
```

If you are using a different directory for holding the Allure results
you must specify it with the `ALLURE_DIR` environment variable.

```yaml
 my_unit_test_reporting_step:
   title: Generate test reporting
   image: codefresh/cf-docker-test-reporting
   working_directory: './my-git-project'
   environment:
     - BUCKET_NAME=my-bucket-name
     - ALLURE_DIR=my-custom-allure-results-folder
     - CF_STORAGE_INTEGRATION=google
```

Once you run your pipeline a new **Test report** button will appear next
to each build. Click on it and you will see your Allure reports.

![Viewing test results for a build](../../images/codefresh_view_results.png)

More details can be found on the [documentation page](https://codefresh.io/docs/docs/testing/test-reports/)

## Historical Test data

Codefresh will automatically keep the results from your previous builds
in the cloud storage. There is no configuration needed for this
behavior. You will see historical trends in your Allure results as you
run more builds.
