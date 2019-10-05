# == Schema Information
#
# Table name: messages
#
#  id               :bigint(8)        not null, primary key
#  body             :text             not null
#  user_id          :integer          not null
#  messageable_id   :integer          not null
#  messageable_type :string           not null
#

class Message < ApplicationRecord
    validates :body, :user_id, :messageable_id, :messageable_type, presence: true

    belongs_to :messageable, :polymorphic => true
    belongs_to :user
end
