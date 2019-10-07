json.extract! membership, :id, :user_id, :memberable_id, :memberable_type
json.name membership.memberable.name
#update this when you need to display member list