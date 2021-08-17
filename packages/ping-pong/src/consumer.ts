import { Kafka } from 'kafkajs'
import { Ping } from './producer'

export default (kafka: Kafka) => {
  return async () => {
    const consumer = kafka.consumer({ groupId: 'pongs' })
    await consumer.connect()
    await consumer.subscribe({
      topic: /pingPongs..*/i,
      fromBeginning: false
    })

    console.log('Consumer subscribed')
    await consumer.run({
      /* eslint-disable @typescript-eslint/no-unused-vars */
      eachMessage: async ({ topic, partition, message }) => {
        const systemId = ((message?.headers || {})['system-id'] ?? {}).toString()

        const untypedValue = JSON.parse(message?.value?.toString() ?? '{}')
        const pingData = untypedValue as Ping

        console.log('Received: ', {
          topic,
          partition,
          offset: message.offset,
          value: untypedValue,
          systemId,
          pingData
        })
      }
    })
  }
}
