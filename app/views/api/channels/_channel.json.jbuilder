json.extract! channel, :name, :topic, :private, :id, :created_at
json.admin channel.user.display_name
messages = []
channel.messages.each do |message|
  messages.push(message.id)
end
users = []
channel.users.each do |user|
  users.push(user.id)
end
json.message_ids = messages
json.user_ids = users
