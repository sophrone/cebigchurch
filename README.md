# Christ Embassy Big Church Website

Welcome to the **Christ Embassy Big Church website**, a dynamic platform built to share sermons, testimonies, and live services with the community. This project is designed to enhance spiritual engagement through an _intuitive user interface_.

## Tech Stack

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Bundler**: Turbopack
- **Other**: React, Nodemailer (for testimony submissions)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   - Create a `.env.local` file in the root directory.
   - Add the following:
     ```plaintext
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password  # Use Gmail App Password
     ```
   - Generate an App Password for Gmail (see [Google Account Security](https://myaccount.google.com/apppasswords)).

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Home (`/`)**: Landing page with site overview.
- **Podcast (`/podcast`)**: Stream sermons with a custom audio player—click _“Listen Now”_ to play, pause, and switch tracks.
- **Testimony (`/testimony`)**: Submit praise reports via a form; submissions are emailed to `cebigchurchtestimonies@gmail.com`.
- **About, Contact, Live-Service, Testimony**: Explore additional pages for community info and engagement.
- **Test**:
  - Submit a testimony form and check the terminal/console for logs.
  - Play a podcast episode and verify resume functionality.

## Features

- Responsive design for mobile (<640px) and desktop (>640px).
- Audio player with play, pause, rewind, and volume controls.
- Testimony form with client-side validation (name, email, min 20-character testimony).
- Email notification for new testimonies using Nodemailer.
- Static praise report showcase.

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

## License

This project is open-source under the **MIT License**. See [LICENSE](LICENSE) for details (create a `LICENSE` file if needed).
