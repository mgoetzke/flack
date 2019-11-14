json.extract! user, :email, :display_name, :id, :image_url, :online
channels = []
json.channels user.channels do |channel|
  channels.push(channel.id)
end
json.channel_ids = channels