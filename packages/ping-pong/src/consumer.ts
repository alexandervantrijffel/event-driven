import { Kafka } from 'kafkajs'
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
        const value = JSON.parse(message?.value?.toString() ?? '{}')
        const systemId = ((message?.headers || {})['system-id'] ?? {}).toString()

        console.log('Received: ', {
          topic,
          partition,
          offset: message.offset,
          value,
          systemId
        })
      }
    })
  }
}
