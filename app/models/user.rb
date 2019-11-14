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
  validates :display_name, :email, :session_token, :password_digest, :image_url, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :email, uniqueness: true

  has_many :memberships
  has_many :messages
  has_many :channels, through: :memberships, source: :memberable, source_type: 'Channel'

  has_many :directs, through: :memberships, source: :memberable, source_type: 'Direct'

  after_initialize :ensure_session_token, :ensure_image_url
  attr_reader :password

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

  def ensure_image_url
    self.image_url ||= self.class.generate_image_url
  end

  def is_online
    self.update({online: true})
  end

  def is_offline
    self.update({online: false})
  end

  def self.generate_image_url
              ["avatar1.png",
              "avatar2.png",
              "avatar3.png",
              "avatar4.png",
              "avatar5.png",
              "avatar6.png",
              "avatar7.png",
              "avatar8.png",
              "avatar9.png"].sample
  end

end
