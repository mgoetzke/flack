# == Schema Information
#
# Table name: channels
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  topic      :string
#  private    :boolean          not null
#  admin_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord
  validates :name, :admin_id, presence: true
  validates_inclusion_of :private, :in => [true, false]

  has_many :memberships, as: :memberable, dependent: :destroy
  has_many :users, through: :memberships
end
