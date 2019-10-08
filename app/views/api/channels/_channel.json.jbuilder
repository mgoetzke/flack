json.extract! channel, :name, :topic, :private, :id, :users, :messages, :created_at
json.admin channel.user.display_name
