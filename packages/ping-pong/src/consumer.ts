import { Kafka } from 'kafkajs'
export default (kafka: Kafka) => {
  return async () => {
    console.log('consumer started')

    const consumer = kafka.consumer({ groupId: 'pongs' })
    await consumer.connect()
    await consumer.subscribe({
      topic: 'ping-pongs',
      fromBeginning: false
    })

    await consumer.run({
      /* eslint-disable @typescript-eslint/no-unused-vars */
      eachMessage: async ({ topic, partition, message }) => {
        const value = JSON.parse(message?.value?.toString() ?? '{}')
        console.log('Received: ', {
          partition,
          offset: message.offset,
          value: value
        })
      }
    })
  }
}
