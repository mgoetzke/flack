json.extract! direct, :name, :id, :created_at
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
