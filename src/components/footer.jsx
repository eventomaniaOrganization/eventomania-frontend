function Footer() {
    return (
        <footer className="footer" style={{ backgroundColor: "#282c34", color: "#fff", padding: "20px", textAlign: "center" }}>
            <p style={{ margin: 0 }}>© 2025 Eventomania. All rights reserved.</p>
            <div style={{ marginTop: "10px" }}>
                <a href="/privacy" style={{ color: "#61dafb", textDecoration: "none", margin: "0 10px" }}>Privacy Policy</a>
                <a href="/terms" style={{ color: "#61dafb", textDecoration: "none", margin: "0 10px" }}>Terms of Service</a>
                <a href="/contact" style={{ color: "#61dafb", textDecoration: "none", margin: "0 10px" }}>Contact Us</a>
            </div>
        </footer>
    );
}

export default Footer;