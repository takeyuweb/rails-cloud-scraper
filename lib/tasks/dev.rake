require "google/cloud/pubsub"

namespace :dev do
  desc 'Setup PubSub emulator'
  task pubsub: :environment do
    pubsub = Google::Cloud.pubsub(ENV["PUBSUB_PROJECT_ID"])
    topic = pubsub.topic("my-topic") || pubsub.create_topic("my-topic")
    subscription1 = topic.subscription("push-subscriber-1") || topic.subscribe("push-subscriber-1")
    subscription1.endpoint = "http://functions:8080"

    topic.publish_async('https://takeyuweb.co.jp', id: 1) do |result|
      raise "Failed to publish the message." unless result.succeeded?
      puts "Message with custom attributes published asynchronously."
    end

    topic.publish_async('https://takeyuweb.co.jp/work', id: 2) do |result|
      raise "Failed to publish the message." unless result.succeeded?
      puts "Message with custom attributes published asynchronously."
    end

    topic.publish_async('https://takeyuweb.co.jp/service', id: 3) do |result|
      raise "Failed to publish the message." unless result.succeeded?
      puts "Message with custom attributes published asynchronously."
    end

    # Stop the async_publisher to send all queued messages immediately.
    topic.async_publisher.stop.wait!
  end
end
