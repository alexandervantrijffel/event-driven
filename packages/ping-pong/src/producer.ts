import { Kafka } from 'kafkajs'

export default (kafka: Kafka) => {
  const producer = kafka.producer({
    maxInFlightRequests: 1, // max number of requests that may be in progress at any time
    idempotent: true, // producer will ensure each message is written exactly once
    transactionalId: 'uniqueId'
  })
  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const send = async (payload: unknown) => {
    console.log('Sending', payload)
    await producer.send({
      topic: 'ping-pongs',
      messages: [{ value: JSON.stringify(payload) }]
    })
  }

  return async () => {
    console.log('producer started')
    await producer.connect()

    while (true) {
      try {
        await send({ ping: Math.random() })
      } catch (error) {
        console.error(error)
      }
      await delay(5000)
    }
  }
}
