import React from "react";
import { createRoot } from "react-dom/client";

const sectionStyle = {
  marginBottom: '40px',
  backgroundColor: '#1a1a1a',
  padding: '30px',
  borderRadius: '12px',
  border: '1px solid #333'
};

const h2Style = {
  marginTop: 0,
  color: '#60a5fa',
  borderBottom: '1px solid #333',
  paddingBottom: '10px',
  marginBottom: '20px'
};

const h3Style = {
  color: '#e0e0e0',
  marginTop: '25px',
  fontSize: '1.2rem'
};

const codeBlockStyle = {
  backgroundColor: '#000',
  padding: '15px',
  borderRadius: '8px',
  fontFamily: 'monospace',
  color: '#a5f3fc',
  overflowX: 'auto' as const,
  border: '1px solid #333'
};

const Guide = () => {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#0f0f0f',
      color: '#e0e0e0',
      minHeight: '100vh',
      padding: '40px 20px',
      lineHeight: '1.6'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '50px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
          <h1 style={{ 
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            margin: '0 0 10px 0'
          }}>
            Telegram to Facebook Auto-Poster
          </h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>
            A complete guide to setting up your own automation bot with AI captions using Cloudflare Workers.
          </p>
        </header>

        {/* Introduction */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>🚀 How it Works</h2>
          <p>
            Once deployed, you will chat with your Telegram Bot to configure it. 
            The bot acts as a wizard, asking for your keys securely and storing them in your personal Cloudflare database (KV). 
            When you send a video to the bot, it will:
          </p>
          <ol style={{ paddingLeft: '20px', color: '#ccc' }}>
            <li>Download the video from Telegram.</li>
            <li>Use Google Gemini AI to watch the video and generate a viral caption based on your topics.</li>
            <li>Upload the video directly to your Facebook Page as a Reel or Video.</li>
          </ol>
        </section>

        {/* Step 1: Telegram */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>1. Create Telegram Bot</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={h3Style}>Get Bot Token</h3>
            <ol style={{ paddingLeft: '20px', color: '#ccc' }}>
              <li>Open Telegram and search for <strong>@BotFather</strong>.</li>
              <li>Send the command <code style={{ color: '#facc15' }}>/newbot</code>.</li>
              <li>Follow the instructions to name your bot (e.g., <em>MyAutoPosterBot</em>).</li>
              <li>Copy the <strong>HTTP API Token</strong> provided (it looks like <code style={{ color: '#888' }}>123456:ABC-Def...</code>).</li>
            </ol>
          </div>
        </section>

        {/* Step 2: Facebook */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>2. Facebook Page Keys</h2>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>
            Note: For a permanent setup, you should create a System User in Meta Business Suite. For testing, use the Graph API Explorer.
          </p>

          <h3 style={h3Style}>A. Get Page ID</h3>
          <p>Go to your Facebook Page, click "About" -> "Page Transparency" or look at the URL to find your <strong>Page ID</strong> (a long number).</p>

          <h3 style={h3Style}>B. Get Access Token</h3>
          <ol style={{ paddingLeft: '20px', color: '#ccc' }}>
            <li>Go to <a href="https://developers.facebook.com/tools/explorer/" target="_blank" style={{ color: '#60a5fa' }}>Meta Graph API Explorer</a>.</li>
            <li>Select your App (or create a new "Business" type app).</li>
            <li>In "User or Page", select <strong>Get Page Access Token</strong> and choose your page.</li>
            <li>Ensure you add these permissions: 
              <ul style={{ marginTop: '5px' }}>
                <li><code style={{ color: '#facc15' }}>pages_manage_posts</code></li>
                <li><code style={{ color: '#facc15' }}>pages_read_engagement</code></li>
              </ul>
            </li>
            <li>Click <strong>Generate Access Token</strong>.</li>
          </ol>
        </section>

        {/* Step 3: Google Gemini */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>3. Google Gemini API</h2>
          <p>This powers the AI caption generation.</p>
          <ol style={{ paddingLeft: '20px', color: '#ccc' }}>
            <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" style={{ color: '#60a5fa' }}>Google AI Studio</a>.</li>
            <li>Click <strong>Create API Key</strong>.</li>
            <li>Copy the key string.</li>
          </ol>
        </section>

        {/* Step 4: Cloudflare Setup */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>4. Cloudflare Deployment</h2>
          
          <h3 style={h3Style}>A. Create Resources</h3>
          <p>Run these commands in your terminal (using Wrangler) or create them in the Cloudflare Dashboard:</p>
          <div style={codeBlockStyle}>
            npx wrangler kv:namespace create USER_CONFIG<br/>
            npx wrangler r2 bucket create video-bucket
          </div>

          <h3 style={h3Style}>B. Configure Secrets</h3>
          <p>Set your Telegram Bot Token as a secret (so it's not in the code):</p>
          <div style={codeBlockStyle}>
            npx wrangler secret put TELEGRAM_BOT_TOKEN
          </div>
          <p>Paste your Bot Token when prompted.</p>

          <h3 style={h3Style}>C. Deploy</h3>
          <div style={codeBlockStyle}>
            npx wrangler deploy
          </div>
        </section>

        {/* Step 5: Webhook */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>5. Connect Webhook</h2>
          <p>Tell Telegram to send messages to your Cloudflare Worker.</p>
          <p>Open your browser and visit:</p>
          <div style={codeBlockStyle}>
            https://api.telegram.org/bot&lt;YOUR_BOT_TOKEN&gt;/setWebhook?url=&lt;YOUR_WORKER_URL&gt;
          </div>
          <p>Replace <code>&lt;YOUR_BOT_TOKEN&gt;</code> and <code>&lt;YOUR_WORKER_URL&gt;</code> (e.g., https://my-bot.user.workers.dev).</p>
        </section>

         {/* Step 6: Usage */}
         <section style={sectionStyle}>
          <h2 style={h2Style}>6. Using the Bot</h2>
          <ol style={{ paddingLeft: '20px', color: '#ccc' }}>
            <li>Open your bot in Telegram and click <strong>Start</strong>.</li>
            <li>Send the command <code style={{ color: '#facc15' }}>/setup</code>.</li>
            <li>Reply with your <strong>Page ID</strong>.</li>
            <li>Reply with your <strong>Facebook Access Token</strong>.</li>
            <li>Reply with your <strong>Gemini API Key</strong>.</li>
            <li>Reply with your <strong>Page Topics</strong> (e.g., "Tech, Coding, Tutorials").</li>
            <li><strong>Done!</strong> Now send any video file to the bot. It will auto-caption and post it.</li>
          </ol>
        </section>

      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Guide />);
