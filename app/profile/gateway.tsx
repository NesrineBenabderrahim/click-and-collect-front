import braintree from 'braintree'
const environment = process.env.BRAINTREE_ENVIRONMENT
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: '6hjmcbvghc9srkkf',
  publicKey: "r9r248g7h8z7szsn",
  privateKey: "2fbb53fcbfdf6613147c7fef5c432eba"
})
export default gateway;