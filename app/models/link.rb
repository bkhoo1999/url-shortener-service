class Link < ApplicationRecord
    default_scope { order("created_at DESC") }
    validates :original_url, presence: true, on: :create_table
    validates_format_of :original_url, with: StringUtil::URL_REGEX
    before_create :generate_slug, :retrieve_title
    has_many :transactions
    attr_accessor :request_protocol, :request_host

    def generate_slug
			new_url_slug = StringUtil.new.generate_slug
			existing_url_slug = Link.where(url_slug: new_url_slug).first
			if existing_url_slug.present?
				self.generate_slug
			else 
				self.url_slug = new_url_slug
				self.short_url = "#{@requestProtocol}#{@requestHost}/#{new_url_slug}"
			end
    end

    def retrieve_title
			begin 
				self.title = Mechanize.new.get(self.original_url).title
			rescue => e 
				self.title = ""
			end
    end
end
