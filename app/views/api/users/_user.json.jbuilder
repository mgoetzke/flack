json.extract! user, :email, :display_name, :id, :image_url

json.channels user.channels do |channel|
  json.channel_name channel.name
  json.channel_id channel.id
end