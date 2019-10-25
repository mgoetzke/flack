json.extract! direct, :id, :created_at
messages = []
direct.messages.each do |message|
  messages.push(message.id)
end
users = []
usernames = []
images = []
direct.users.each do |user|
  users.push(user.id)
  if user != current_user
    usernames.push(user.display_name)
    images.push(user.image_url)
  end
end
json.message_ids messages
json.user_ids users
json.name usernames.join(', ')
json.images images