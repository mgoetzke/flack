class Direct < ApplicationRecord
  NUMBER_OF_PERMITTED_MEMBERSHIPS = 9;
  has_many :memberships, as: :memberable, dependent: :destroy, before_add: :validate_user_limit
  has_many :users, through: :memberships
  has_many :messages, as: :messageable, dependent: :destroy

  def validate_user_limit(memberhip)
    raise Exception.new if memberhips.size >= NUMBER_OF_PERMITTED_MEMBERSHIPS
  end

end