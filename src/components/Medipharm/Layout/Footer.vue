<template>
<footer class="medipharm-footer">
    <!-- Background Glows -->
    <div class="footer-glow glow1"></div>
    <div class="footer-glow glow2"></div>

    <v-container class="footer-inner">
        <!-- HERO BRAND -->
        <div class="footer-brand">
            <div class="logo-frame">
    <img :src="logo" alt="Medipharm" width="100%"/>
  </div>
           <div class="brand-info">
  <h1>MSD MEDIPHARM</h1>
  <p class="jv">A Subsidiary of the Medical Stores Department (MSD)</p>
</div>
        </div>

      <div class="footer-content">
  <!-- COLUMN 1 -->
  <div class="footer-col">
    <h4>Company</h4>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About Us</a></li>
      <li><a href="/facilities">Our Facilities</a></li>
      <li><a href="/news">News & Media</a></li>
      <li><a href="/careers">Careers</a></li>
    </ul>
  </div>

  <!-- COLUMN 2 -->
  <div class="footer-col">
    <h4>Products</h4>
    <ul>
      <li><a href="/products">Surgical Face Masks</a></li>
      <li><a href="/products">N95 Respirators</a></li>
      <li><a href="/products">Examination Gloves</a></li>
      <li><a href="/products">Hand Sanitizers & More</a></li>
    </ul>
  </div>

  <!-- COLUMN 3 -->
  <div class="footer-col">
    <h4>Resources</h4>
    <ul>
      <li><a href="/quality">Quality & Compliance</a></li>
      <li><a href="/sustainability">Sustainability</a></li>
      <li><a href="/partnerships">Partnerships</a></li>
      <li><a href="/contact">Contact Us</a></li>
    </ul>
  </div>

  <!-- COLUMN 4 - CONTACT -->
  <div class="footer-col contact-col">
    <h4>Contact Us</h4>
    <div class="contact-details">
      <p>
        MSD Medipharm Manufacturing Co. LTD<br>
        P.O. Box 9081, MSD Office, Block C<br>
        Keko Mwanga, Dar es Salaam, Tanzania
      </p>
      <p class="mt-3">
        <strong>Email:</strong><br>
        info.medipharm@msd.go.tz
      </p>
    </div>

    <!-- SOCIAL ICONS -->
    <div class="socials">
      <a href="#" target="_blank" class="social-icon" title="LinkedIn"><v-icon size="24">mdi-linkedin</v-icon></a>
      <a href="#" target="_blank" class="social-icon" title="Facebook"><v-icon size="24">mdi-facebook</v-icon></a>
      <a href="#" target="_blank" class="social-icon" title="Instagram"><v-icon size="24">mdi-instagram</v-icon></a>
      <a href="#" target="_blank" class="social-icon" title="X"><v-icon size="24">mdi-twitter</v-icon></a>
    </div>
  </div>
</div>

        <!-- DIVIDER -->
        <div class="footer-divider"></div>

        <!-- BOTTOM -->
       <div class="footer-bottom">
  <div>© {{ new Date().getFullYear() }} MSD Medipharm. All Rights Reserved.</div>
  <div class="cert">TMDA Licensed • GMP Compliant • Subsidiary of MSD</div>
</div>
    </v-container>
</footer>
</template>

<script>
import logo from '@/assets/medifarm/logo.png';

export default {
    data() {
        return {
            logo
        };
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=Playfair+Display:wght@700;900&display=swap');

.medipharm-footer {
    position: relative;
    background: linear-gradient(135deg, #162456, #233781);
    color: #e2e8f0;
    padding: 140px 0 60px;
    overflow: hidden;
}

/* Glow Orbs */
.footer-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(180px);
    opacity: 0.13;
    z-index: 1;
}

.glow1 {
    width: 720px;
    height: 720px;
    background: #93C439;
    top: -240px;
    left: -180px;
}

.glow2 {
    width: 580px;
    height: 580px;
    background: #93C439;
    bottom: -220px;
    right: -160px;
}

.footer-inner {
    position: relative;
    z-index: 2;
    max-width: 1260px;
    margin: 0 auto;
    padding: 0 40px;
}

/* BRAND - LARGER & MORE PREMIUM */
.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  margin-bottom: 110px;
  text-align: center;
}

.logo-frame {
  width: 168px;           /* Significantly larger */
  height: 168px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 40px;
  backdrop-filter: blur(28px);
  box-shadow: 
    0 35px 70px -15px rgba(0, 0, 0, 0.55),
    inset 0 0 40px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.4s ease;
}

.logo-frame:hover {
  transform: scale(1.05);
  box-shadow: 
    0 40px 80px -10px rgba(0, 0, 0, 0.6),
    inset 0 0 50px rgba(255, 255, 255, 0.15);
}

.logo-frame img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(1.05);
}

/* Brand Text */
.brand-info h1 {
  /* font-family: 'Playfair Display', serif; */
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -3px;
  color: white;
  margin: 0;
  line-height: 1;
}

.jv {
  color: #93C439;
  font-size: 1.08rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-top: 12px;
}


/* CONTENT */
.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 70px 40px;
    margin-bottom: 90px;
}

.footer-col h4 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #93C439;
    margin-bottom: 26px;
    letter-spacing: 0.8px;
}

.footer-col ul {
    list-style: none;
    padding: 0;
}

.footer-col li {
    margin-bottom: 13px;
}

.footer-col a {
    color: rgba(226, 232, 240, 0.8);
    text-decoration: none;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-col a:hover {
    color: white;
    padding-left: 10px;
}

/* CONTACT */
.contact-details {
    line-height: 1.75;
    font-size: 0.98rem;
    color: rgba(226, 232, 240, 0.75);
}

.contact-details strong {
    color: #93C439;
}

/* SOCIAL ICONS */
.socials {
  margin-top: 40px;
  display: flex;
  gap: 16px;
}

.social-icon {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e2e8f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.social-icon:hover {
  background: #93C439;
  color: #162456;
  transform: translateY(-6px) scale(1.08);
  box-shadow: 0 10px 25px rgba(147, 196, 57, 0.3);
}
/* DIVIDER */
.footer-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(147, 196, 57, 0.4), transparent);
    margin: 60px 0;
}

/* BOTTOM */
.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    font-size: 0.9rem;
    color: rgba(226, 232, 240, 0.65);
}

.cert {
    color: #93C439;
    font-weight: 500;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
    .footer-brand {
        flex-direction: column;
        gap: 24px;
    }
}

@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr 1fr;
    }

    .footer-bottom {
        flex-direction: column;
        text-align: center;
    }
}
</style>
