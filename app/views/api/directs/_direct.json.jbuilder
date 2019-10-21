json.extract! direct, :name, :id, :created_at
messages = []
direct.messages.each do |message|
  messages.push(message.id)
end
users = []
usernames = []
direct.users.each do |user|
  users.push(user.id)
  usernames.push(user.display_name)
end

json.message_ids = messages
json.user_ids = users
json.usernames = usernames.join(',')
# json.name = "blacherwr"