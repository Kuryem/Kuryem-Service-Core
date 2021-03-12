const AwsConfigs = {
  EcHost: process.env.ECHOST,
  SshPort: 22,
  AccessKeyId: process.env.AWS_AccessKey,
  SecretAccessKey: process.env.AWS_SecretKey,
  Region: 'us-east-1',
};

module.exports = AwsConfigs;
