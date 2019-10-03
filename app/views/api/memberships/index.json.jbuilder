@memberships.each do |membership|
  json.set! membership.id do
    json.partial! 'membership', membership: membership
  end
end