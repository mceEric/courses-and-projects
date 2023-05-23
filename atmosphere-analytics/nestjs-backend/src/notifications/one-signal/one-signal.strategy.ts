import * as OneSignal from '@onesignal/node-onesignal';

export class OneSignalStrategy {
  //Configuration function for OneSignal
  oneSignalConfig(): OneSignal.Configuration {
    const oneSignalKeyProvider = {
      getToken() {
        return process.env.NEXT_PUBLIC_ONESIGNAL_REST_API_KEY;
      },
    };

    return OneSignal.createConfiguration({
      authMethods: {
        app_key: {
          tokenProvider: oneSignalKeyProvider,
        },
      },
    });
  }

  //Returns the strategy for the OneSignal client and config
  oneSignalClient(): OneSignal.DefaultApi {
    return new OneSignal.DefaultApi(this.oneSignalConfig());
  }
}
