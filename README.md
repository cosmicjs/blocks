<a href="https://blocks.cosmicjs.com">
  <img src="https://github.com/cosmicjs/blocks/assets/26257029/2e2962f4-37e7-479e-9588-ddd261d11790" />
</a>

# Blocks

[Blocks](https://blocks.cosmicjs.com) are data infused components for building Cosmic powered websites and apps. Use Blocks to build website features such as landing pages, blogs, image galleries, events, and more.

## Get started

[View all Blocks](https://blocks.cosmicjs.com)

[Explore the demo](https://cosmic-agency-template.vercel.app)

## Blocks include

- Landing page
- Blog
- Ecommerce (powered by Stripe 🛒)
- Contact form (powered by Resend ✉️)
- Events
- FAQs
- Testimonials
- Navigation
- Comments
- Image gallery
- and more!

## Features

⚡️ Performance optimized

👁 Draft preview ready

🛍 Ecommerce built-in

📱 Mobile responsive

🌎 Localization ready

🌓 Dark mode ready

🔧 Customizable

♿️ Accessible

🦺 Type safe


## Built with

- React Server Components
- Tailwind CSS
- TypeScript
- Next.js

## Contributing

1. Download this code repository and install the dependencies.
```bash
git clone https://github.com/cosmicjs/blocks
cd blocks
bun install
```

2. Create a `.env.local` file with your Cosmic API keys. Find these after logging in to the Cosmic dashboard in [Project > API keys](https://app.cosmicjs.com/?redirect_to=?highlight=api-keys). (Ask [Cosmic support](https://www.cosmicjs.com/contact) for a bucket export file to connect Blocks dynamic content.)

```
cp .env.example .env.local
```

It will look like this:
```
# .env.local
NEXT_PUBLIC_SOURCE_BUCKET_SLUG=change_to_your_bucket_slug
NEXT_PUBLIC_SOURCE_READ_KEY=change_to_your_bucket_read_key
```

3. Run the app.
```
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

Licensed under the [MIT license](https://github.com/cosmicjs/blocks/blob/main/LICENSE).
