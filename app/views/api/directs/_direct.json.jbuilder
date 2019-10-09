json.extract! direct, :name, :topic, :private, :id, :created_at
json.admin direct.user.display_name
messages = []
direct.messages.each do |message|
  messages.push(message.id)
end
users = []
direct.users.each do |user|
  users.push(user.id)
end
json.message_ids = messages
json.user_ids = users
