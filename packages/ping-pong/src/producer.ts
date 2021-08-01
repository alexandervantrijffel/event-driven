import { Kafka, KafkaJSProtocolError } from 'kafkajs'
import { v4 as uuidv4 } from 'uuid'

export default (kafka: Kafka) => {
  const producer = kafka.producer({
    maxInFlightRequests: 1, // max number of requests that may be in progress at any time
    idempotent: true, // producer will ensure each message is written exactly once
    transactionalId: 'uniqueId'
  })
  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // valid topic characters are
  // _ . -
  const sessionTopics = [`pingPongs-a`, `pingPongs-b`, `pingPongs-c`]

  const send = async (payload: unknown) => {
    const topic = sessionTopics[+(Math.random() * 100).toFixed(0) % 3]
    console.log('Sending', { payload, topic })
    await producer.send({
      topic: topic,
      messages: [
        {
          value: JSON.stringify(payload),
          headers: { 'system-id': 'pingProducer' }
        }
      ]
    })
  }

  return async () => {
    await producer.connect()

    console.log('Producer connected')
    const aggregateId = uuidv4()
    while (true) {
      try {
        await send({
          ping: +Math.random().toFixed(2),
          aggregateId
        })
      } catch (error) {
        if (error as KafkaJSProtocolError) {
          console.error('Kafka protocol error', error)
        } else {
          console.error(error)
        }
      }
      await delay(10000)
    }
  }
}
