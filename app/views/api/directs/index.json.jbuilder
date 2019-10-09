@directs.each do |direct|
  json.set! direct.id do
    json.partial! 'direct', direct: direct
  end
end