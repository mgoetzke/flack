json.extract! membership, :id, :user_id, :memberable_id, :memberable_type
json.name membership.memberable.name
json.privacy membership.memberable.private
#update this when you need to display member list