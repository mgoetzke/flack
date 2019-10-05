json.extract! message, :body, :id, :user_id, :messageable_id, :messageable_type, :user_id, :created_at, :updated_at
json.display_name message.user.display_name
json.image_url message.user.image_url

