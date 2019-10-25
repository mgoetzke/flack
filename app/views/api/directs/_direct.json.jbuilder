json.extract! direct, :id, :created_at
messages = []
last_message = 0
direct.messages.each do |message|
  messages.push(message.id)
  last_message = message.created_at.to_time.to_i
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
json.last_activity last_message