require "google/cloud/pubsub"

namespace :dev do
  desc 'Setup PubSub emulator'
  task pubsub: :environment do
    pubsub = Google::Cloud.pubsub(ENV["PUBSUB_PROJECT_ID"])
    topic = pubsub.topic("my-topic") || pubsub.create_topic("my-topic")
    subscription1 = topic.subscription("push-subscriber-1") || topic.subscribe("push-subscriber-1")
    subscription1.endpoint = "http://functions:8080"

    topic.publish('https://takeyuweb.co.jp')
    topic.publish('https://takeyuweb.co.jp/work')
    topic.publish('https://takeyuweb.co.jp/service')
  end
end
