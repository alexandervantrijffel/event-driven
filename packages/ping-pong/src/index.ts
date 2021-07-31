import { Kafka } from 'kafkajs'
import producer from './producer'
import consumer from './consumer'

const kafka = new Kafka({
  clientId: 'ping-pong',
  brokers: ['localhost:9092']
})

console.log('started')
;(async () => {
  await Promise.all([producer(kafka)(), consumer(kafka)()])
})()
