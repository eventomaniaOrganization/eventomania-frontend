function Contact() {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#2c3e50', fontSize: '2.5rem', marginBottom: '10px' }}>Contact Us</h1>
      <p style={{ color: '#34495e', fontSize: '1.2rem', marginBottom: '20px' }}>
        If you have any questions, feel free to reach out to us!
      </p>
      <p style={{ color: '#34495e', fontSize: '1.2rem', marginBottom: '10px' }}>
        Phone: <a href="tel:+460737111000" style={{ color: '#2980b9', textDecoration: 'none' }}>046737123456</a>
      </p>
      <p style={{ color: '#34495e', fontSize: '1.2rem', marginBottom: '20px' }}>
        Email: <a href="mailto:info@eventomania.com" style={{ color: '#2980b9', textDecoration: 'none' }}>info@eventomania.com</a>
      </p>
      <div style={{ height: '400px', width: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <iframe
        title="Helsingborg Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.1234567890123!2d12.6945123456789!3d56.0464678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653ab1234567890%3A0x1234567890abcdef!2sHelsingborg%20Centrum!5e0!3m2!1sen!2sse!4v1234567890123"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      </div>
    );
  }
  
  export default Contact;
  