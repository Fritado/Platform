import React from 'react'

const TermsConditionModal = ({ show, onClose, onAccept, onDecline, children }) => {
  if (!show) {
    return null
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          {' '}
          <h5 className="modal-title">Terms & Conditions</h5>
          <button type="button" className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>
            1. Introduction Welcome to [Your Application Name] ("we", "our", "us"). By accessing or
            using our web-based application ("Service"), you agree to comply with and be bound by
            these Terms and Conditions ("Terms"). Please read these Terms carefully before using our
            Service. If you do not agree to these Terms, you may not access or use the Service. 2.
            Acceptance of Terms By creating an account, accessing, or using our Service, you agree
            to be bound by these Terms and our Privacy Policy. If you are using the Service on
            behalf of an organization, you are agreeing to these Terms for that organization and
            promising that you have the authority to bind that organization to these Terms. In that
            case, "you" and "your" will refer to that organization. 3. Eligibility You must be at
            least 18 years old to use our Service. By using our Service, you represent and warrant
            that you meet the eligibility requirements. 4. Account Registration To access certain
            features of the Service, you must register for an account. You agree to provide
            accurate, current, and complete information during the registration process and to
            update such information to keep it accurate, current, and complete. We reserve the right
            to suspend or terminate your account if any information provided during the registration
            process or thereafter proves to be inaccurate, not current, or incomplete. 5. User
            Responsibilities You are responsible for maintaining the confidentiality of your account
            login information and for all activities that occur under your account. You agree to
            notify us immediately of any unauthorized use of your account or any other breach of
            security. We will not be liable for any loss or damage arising from your failure to
            comply with this obligation. 6. Prohibited Conduct You agree not to use the Service to:
            Violate any local, state, national, or international law. Infringe the intellectual
            property rights of others. Transmit any viruses, worms, defects, Trojan horses, or other
            items of a destructive nature. Engage in any activity that interferes with or disrupts
            the Service. 7. Intellectual Property The Service and its original content, features,
            and functionality are and will remain the exclusive property of [Your Application Name]
            and its licensors. The Service is protected by copyright, trademark, and other laws of
            both the [Country] and foreign countries. Our trademarks and trade dress may not be used
            in connection with any product or service without the prior written consent of [Your
            Application Name]. 8. Termination We may terminate or suspend your account and bar
            access to the Service immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach the Terms. Upon termination, your
            right to use the Service will immediately cease. If you wish to terminate your account,
            you may simply discontinue using the Service. 9. Limitation of Liability In no event
            shall [Your Application Name], nor its directors, employees, partners, agents,
            suppliers, or affiliates, be liable for any indirect, incidental, special,
            consequential, or punitive damages, including without limitation, loss of profits, data,
            use, goodwill, or other intangible losses, resulting from (i) your use or inability to
            use the Service; (ii) any unauthorized access to or use of our servers and/or any
            personal information stored therein; (iii) any interruption or cessation of transmission
            to or from the Service; (iv) any bugs, viruses, trojan horses, or the like that may be
            transmitted to or through our Service by any third party; (v) any errors or omissions in
            any content or for any loss or damage incurred as a result of your use of any content
            posted, emailed, transmitted, or otherwise made available through the Service, whether
            based on warranty, contract, tort (including negligence), or any other legal theory,
            whether or not we have been informed of the possibility of such damage, and even if a
            remedy set forth herein is found to have failed of its essential purpose. 10. Governing
            Law These Terms shall be governed and construed in accordance with the laws of [Your
            Country], without regard to its conflict of law provisions. Our failure to enforce any
            right or provision of these Terms will not be considered a waiver of those rights. If
            any provision of these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These Terms constitute the
            entire agreement between us regarding our Service and supersede and replace any prior
            agreements we might have had between us regarding the Service. 11. Changes to Terms We
            reserve the right, at our sole discretion, to modify or replace these Terms at any time.
            If a revision is material, we will try to provide at least 30 days' notice prior to any
            new terms taking effect. What constitutes a material change will be determined at our
            sole discretion. By continuing to access or use our Service after those revisions become
            effective, you agree to be bound by the revised terms. If you do not agree to the new
            terms, please stop using the Service. 12. Contact Us If you have any questions about
            these Terms, please contact us at [Your Contact Information].
          </p>
        </div>
        <div className="modal-footer ">
          <button className="btn-db btn-primary" onClick={onAccept}>
            Accept
          </button>
          <button className="btn-db btn-secondary" onClick={onDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}

export default TermsConditionModal
