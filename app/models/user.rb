# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  display_name    :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#


class User < ApplicationRecord
  validates :display_name, :email, :session_token, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :email, uniqueness: true

  has_many :memberships
  has_many :messages
  has_many :channels, through: :memberships, source: :memberable, source_type: 'channel'

  after_initialize :ensure_session_token
  attr_reader :password

  #IGVAPER

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)
    return nil unless @user && @user.is_password?(password)
    @user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    bcrypted = BCrypt::Password.new(self.password_digest)
    bcrypted.is_password?(password)
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

end
