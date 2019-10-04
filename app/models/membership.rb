# == Schema Information
#
# Table name: memberships
#
#  id              :bigint(8)        not null, primary key
#  user_id         :integer          not null
#  memberable_id   :integer          not null
#  memberable_type :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Membership < ApplicationRecord
  belongs_to :memberable, :polymorphic => true
  belongs_to :user,
    foreign_key: :user_id,
    primary_key: :id
end
