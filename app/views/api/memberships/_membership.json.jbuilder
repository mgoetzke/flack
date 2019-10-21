json.extract! membership, :id, :user_id, :memberable_id, :memberable_type
json.name membership.memberable.name
if membership.memberable_type == 'Channel'
  json.privacy membership.memberable.private
end
#update this when you need to display member list