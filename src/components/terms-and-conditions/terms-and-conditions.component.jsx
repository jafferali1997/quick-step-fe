'use client';

import '@/common/styles/landing-page/header.style.scss';
import Footer from '../landing-page/components/footer/footer.component';
import Header from '../landing-page/components/header/header.component';

export default function TermsAndConditions() {
  const links = [
    { text: 'OUR SERVICES', id: 'term-01' },
    { text: 'INTELLECTUAL PROPERTY RIGHTS', id: 'term-02' },
    { text: 'USER REPRESENTATIONS', id: 'term-03' },
    { text: 'USER REGISTRATION', id: 'term-04' },
    { text: 'PURCHASES AND PAYMENT', id: 'term-05' },
    { text: 'FREE TRIAL', id: 'term-06' },
    { text: 'CANCELLATION', id: 'term-07' },
    { text: 'PROHIBITED ACTIVITIES', id: 'term-08' },
    { text: 'USER GENERATED CONTRIBUTIONS', id: 'term-09' },
    { text: 'CONTRIBUTION LICENCE', id: 'term-10' },
    { text: 'SOCIAL MEDIA', id: 'term-11' },
    { text: 'SERVICES MANAGEMENT', id: 'term-12' },
    { text: 'PRIVACY POLICY', id: 'term-13' },
    { text: 'COPYRIGHT INFRINGEMENTS', id: 'term-14' },
    { text: 'TERM AND TERMINATION', id: 'term-15' },
    { text: 'MODIFICATIONS AND INTERRUPTIONS', id: 'term-16' },
    { text: 'GOVERNING LAW', id: 'term-17' },
    { text: 'DISPUTE RESOLUTION', id: 'term-18' },
    { text: 'CORRECTIONS', id: 'term-19' },
    { text: 'DISCLAIMER', id: 'term-20' },
    { text: 'LIMITATIONS OF LIABILITY', id: 'term-21' },
    { text: 'INDEMNIFICATION', id: 'term-22' },
    { text: 'USER DATA', id: 'term-23' },
    { text: 'ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES', id: 'term-24' },
    { text: 'CALIFORNIA USERS AND RESIDENTS', id: 'term-25' },
    { text: 'MISCELLANEOUS', id: 'term-26' },
    { text: 'CONTACT US', id: 'term-27' }
  ];

  return (
    <div className="home-wrapper" data-auto-select="true">
      <Header />
      <div className="terms-and-conditions">
        <header className="tw-flex tw-justify-center tw-py-[82px]">
          <div className="w-full tw-mx-auto tw-px-5 tw-text-center md:tw-w-2/4">
            <h2 className="tw-pb-2 tw-text-4xl tw-font-bold tw-text-black md:tw-text-6xl">
              Terms & Conditions
            </h2>
            <p className="tw-text-dark-gray">
              We offer products, solutions, and services across the entire energy value
              chain. We support our customers on their way to a more sustainable future.
            </p>
          </div>
        </header>
        <main className="tw-container tw-mx-auto tw-py-[100px]">
          <div className="">
            <div className="tw-float-right tw-mb-24 md:tw-mb-56 md:tw-ml-32">
              <div className="tw-rounded-[15px] tw-p-5 tw-pr-0 tw-shadow">
                <h3 className="tw-pb-4 tw-text-xl tw-font-bold">TERMS AND CONDITIONS</h3>
                <div className="tw-h-[556px] tw-overflow-y-auto">
                  <div className="tw-flex tw-flex-col tw-gap-y-5">
                    {links.map(({ text, id }, index) => (
                      <a
                        href={`#${id}`}
                        className="tw-cursor-pointer tw-pr-5 tw-font-medium"
                      >
                        {index + 1}- {text}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="tw-mt-9 tw-border-2 tw-border-t tw-border-[#E5E7EB]" />
            </div>

            <article className="">
              <h3 className="tw-text-[28px] tw-font-bold">Terms & Conditions</h3>
              <p>Last updated July 05, 2023</p>
              <h4>AGREEMENT TO OUR LEGAL TERMS</h4>
              <p>
                We are QuickSteps (&apos;Company&apos;, &apos;we&apos;, &apos;us&apos;, or
                &apos;our&apos;).
              </p>
              <p>
                We operate the website{' '}
                <a href="/">https://dashboard.myquicksteps.de/login</a> (the
                &apos;Site&apos;), as well as any other related products and services that
                refer or link to these legal terms (the &apos;Legal Terms&apos;)
                (collectively, the &apos;Services&apos;).
                <br /> The platform offers a wide range of features, including document
                management, order processing, delivery notes management, bills management,
                and more. The application is user-friendly, secure, and accessible from
                anywhere in the world, making it a valuable tool for anyone involved in
                international trade. With its robust and innovative design, this web
                application aims to revolutionize the way international trade is conducted
                and make the process more efficient and cost-effective for everyone
                involved. You can contact us by email at <a href="/">
                  info@deepprom.de
                </a>{' '}
                or by mail to _____________ Germany.
                <br /> These Legal Terms constitute a legally binding agreement made
                between you, whether personally or on behalf of an entity
                (&apos;you&apos;), and QuickSteps, QuickSteps, concerning your access to
                and use of the Services. You agree that by accessing the Services, you
                have read, understood, and agreed to be bound by all of these Legal Terms.
                IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY
                PROHIBITED FROM USING THE SERVICES AND DISCONTINUE USE IMMEDIATELY. We
                will provide you with prior notice of any scheduled changes to the
                Services you are using. The modified Legal Terms will become effective
                upon posting or notifying you by <a href="/">info@deepprom.de</a>, as
                stated in the email message. By continuing to use the Services after the
                effective date of any changes, you agree to be bound by the modified
                terms. The Services are intended for users who are at least 18 years old.
                Persons under the age of 18 are not permitted to use or register for the
                Services. We recommend that you print a copy of these Legal Terms for your
                records.
              </p>
              <p>
                We will provide you with prior notice of any scheduled changes to the
                Services you are using. The modified Legal Terms will become effective
                upon posting or notifying you by <a href="/">info@deepprom.de</a>, as
                stated in the email message. By continuing to use the Services after the
                effective date of any changes, you agree to be bound by the modified
                terms. The Services are intended for users who are at least 18 years old.
                Persons under the age of 18 are not permitted to use or register for the
                Services. We recommend that you print a copy of these Legal Terms for your
                records.
              </p>

              <h4 id="term-01">1- OUR SERVICES</h4>
              <p>
                The information provided when using the Services is not intended for
                distribution to or use by any person or entity in any jurisdiction or
                country where such distribution or use would be contrary to law or
                regulation or which would subject us to any registration requirement
                within such jurisdiction or country. Accordingly, those persons who choose
                to access the Services from other locations do so on their own initiative
                and are solely responsible for compliance with local laws, if and to the
                extent local laws are applicable.
                <br />
                The Services are not tailored to comply with industry-specific regulations
                (Health Insurance Portability and Accountability Act (HIPAA), Federal
                Information Security Management Act (FISMA), etc.), so if your
                interactions would be subjected to such laws, you may not use the
                Services. You may not use the Services in a way that would violate the
                Gramm-Leach-Bliley Act (GLBA).
              </p>

              <h4 id="term-02">2- Our intellectual property</h4>
              <p>
                We are the owner or the licensee of all intellectual property rights in
                our Services, including all
                <br />
                source code, databases, functionality, software, website designs, audio,
                video, text, photographs,
                <br />
                And graphics in the Services (collectively, the &apos;Content&apos;), as
                well as the trademarks, service marks, and logos contained therein (the
                &apos;Marks&apos;).
                <br />
                Our Content and Mar are protected by copyright and trademark laws (and
                various other intellectual property rights and unfair competition laws)
                and treaties in the United States and around the world.
                <br />
                The Content and Marks are provided in or through the Services &apos;AS
                IS&apos; for your internal business
                <br />
                purpose only.
              </p>
              <b className="tw-pb-8">Your use of our Services</b>
              <p>
                Subject to your compliance with these Legal Terms, including the{' '}
                <span className="tw-text-primary">&apos;PROHIBITED ACTIVITIES&apos;</span>
                <br />
                Section below, we grant you a non-exclusive, non-transferable, revocable
                license to:
                <ul>
                  <li>access the Services; and</li>
                  <li>
                    download or print a copy of any portion of the Content to which you
                    have properly gained access.
                  </li>
                </ul>
                solely for your internal business purpose.
                <br />
                Except as set out in this section or elsewhere in our Legal Terms, no part
                of the Services and no Content or Marks may be copied, reproduced,
                aggregated, republished, uploaded, posted, publicly displayed, encoded,
                translated, transmitted, distributed, sold, licensed, or otherwise
                exploited for any commercial purpose whatsoever, without our express prior
                written permission.
                <br />
                If you wish make any use of Services, Content, or Mar; other as set out in
                this section or elsewhere in our Legal Terms, please address your request
                to: QuickSteps@gmail.com. If we ever grant you the permission to post,
                reproduce, or publicly display any part of our Services or Content, you
                must identify us as the owners or licensors of the Services, Content, or
                Marks and ensure that any copyright or proprietary notice appears or is
                visible on posting, reproducing, or displaying our Content.
                <br />
                We reserve all rights not expressly granted to you in and to the Services,
                Content, and Marks.
                <br />
                Any breach of these Intellectual Property Rights will constitute a
                material breach of our Legal Terms and your right to use our Services will
                terminate immediately.
              </p>
              <b className="tw-pb-8">Your submissions and contributions</b>
              <p>
                Please review this section and the{' '}
                <span className="tw-text-primary">&apos;PROHIBITED ACTIVITIES</span>{' '}
                section carefully prior to using our Services to understand the (a) rights
                you give us and (b) obligations you have when you post or upload any
                content through the Services.
                <br />
                <b>Submissions:</b> By directly sending us any question, comment,
                suggestion, idea, feedback, or other information about the Services
                (&apos;Submissions&apos;), you agree to assign to us all intellectual
                property rights in such Submission. You agree that we shall own this
                Submission and be entitled to its unrestricted use and dissemination for
                any lawful purpose, commercial or otherwise, without acknowledgment or
                compensation to you.
                <br />
                <b>Contributions:</b> The Services may invite you to chat, contribute to,
                or participate in blogs, message boards, online forums, and other
                functionality during which you may create, submit, post, display,
                transmit, publish, distribute, or broadcast content and materials to us or
                through the Services, including but not limited to text, writings, video,
                audio, photographs, music, graphics, comments, reviews, rating
                suggestions, personal information, or other material
                (&apos;Contributions&apos;). Any Submission that is publicly posted shall
                also be treated as a Contribution.
                <br />
                You understand that Contributions may be viewable by other users of the
                Services.{' '}
                <b>
                  When you post Contributions, you grant us a license (including use of
                  your name, trademarks, and logos):
                </b>{' '}
                By posting any Contributions, you grant us an unrestricted, unlimited,
                Irrevocable, perpetual, non-exclusive, transferable, royalty-free,
                fully-paid, worldwide right, and License to: use, copy, reproduce,
                distribute, sell, resell, publish, broadcast, retitle, store, publicly
                perform, publicly display, reformat, translate, excerpt (in whole or in
                part), and exploit your Contributions (including, without limitation, your
                image, name, and voice) for any purpose, commercial, advertising, or
                otherwise, to prepare derivative works of, or incorporate into other
                Works, you’re Contributions, and to sublicense the licenses granted in
                this section. Our use and distribution may occur in any media formats and
                through any media channels. This license includes our use of your name,
                company name, and franchise name, as applicable, and any of the
                trademarks, service marks, trade names, logos, and personal and commercial
                images you provide.
                <br />
                <b>You are responsible for what you post or upload:</b> By sending us
                Submissions and/or posting Contributions through any part of the Services
                or making Contributions accessible through the Services by linking your
                account through the Services to any of your social networking accounts,
                you:
                <br />
                <ul>
                  <li>
                    confirm that you have read and agree with our{' '}
                    <span className="tw-text-primary">
                      &apos;PROHIBITED ACTIVITIES&apos;
                    </span>{' '}
                    and will not post, send, publish, upload, or transmit through the
                    Services any Submission nor post any Contribution that is illegal,
                    hateful, harmful, defamatory, obscene, bullying, abusive,
                    discriminatory, threatening to any person or group, sexually false,
                    inaccurate, deceitful, or misleading;
                  </li>
                  <li>
                    to the extent permissible by applicable law, waive any and all moral
                    rights to any such Submission and/or Contribution;
                  </li>
                  <li>
                    warrant that any such Submission and/or Contributions are original to
                    you or that you have the necessary rights and licences to submit such
                    Submissions and/or Contributions and that you have full authority to
                    grant us the above-mentioned rights in relation to your Submissions
                    and/or Contributions; and
                  </li>
                  <li>
                    warrant and represent that your Submissions and/or Contributions do
                    not constitute confidential information
                  </li>
                </ul>
                You are solely responsible for your Submissions and/or Contributions and
                you expressly agree to reimburse us for any and all losses that we may
                suffer because of your breach of (a) this section, (b) any third
                party&apos;s intellectual property rights, or (c) applicable law.
                <br />
                <b>We may remove or edit your Content:</b> Although we have no obligation
                to monitor any Contributions, we shall have the right to remove or edit
                any Contributions at any time without notice if in our reasonable opinion
                we consider such Contributions harmful or in breach of these Legal Terms.
                If we remove or edit any such Contributions, we may also suspend or
                disable your account and report you to the authorities.
              </p>
              <b>Copyright infringement</b>
              <p>
                We respect the intellectual property rights of others. If you believe that
                any material available on or through the Services infringes upon any
                copyright you own or control, please immediately refer to the{' '}
                <span className="tw-text-primary">
                  &apos;COPYRIGHT INFRINGEMENTS&apos;
                </span>{' '}
                section below.
              </p>

              <h4 id="term-03">3- USER REPRESENTATIONS</h4>
              <p>
                By using the Services, you represent and warrant that: (1) all
                registration information you submit
                <br />
                will be true, accurate, current, and complete; (2) you will maintain the
                accuracy of such information and promptly update such registration
                information as necessary; (3) you have the legal capacity and you agree to
                comply with these Legal Terms; (4) you are not a minor in the jurisdiction
                in which you reside; (5) you will not access the Services through
                automated or non-human means, whether through a bot, script or otherwise;
                (6) you will not use the Services for any illegal or unauthorized purpose;
                and (7) your use of the Services will not violate any applicable law or
                regulation.
                <br />
                If you provide any information that is untrue, inaccurate, not current, or
                incomplete, we have the
                <br />
                Right to suspend or terminate your account and refuse any and all current
                or future use of the Services (or any portion thereof).
              </p>

              <h4 id="term-04">4- USER REGISTRATION</h4>
              <p>
                You may be required to register to use the Services. You agree to keep
                your password confidential and will be responsible for all use of your
                account and password. We reserve the right to remove, reclaim, or change a
                username you select if we determine, in our sole discretion, that such
                username inappropriate, obscene, or otherwise objectionable.
              </p>

              <h4 id="term-05">5- PURCHASES AND PAYMENT</h4>
              <p>
                We accept the following forms of payment:
                <br />
                <ul>
                  <li>Visa</li>
                  <li>Mastercard</li>
                  <li>American Express</li>
                  <li>PayPal</li>
                </ul>
                You agree to provide current, complete, and accurate purchase and account
                information for all purchases made via the Services. You further agree to
                promptly update account and payment information, including email address,
                payment method, and payment card expiration date, so that we can complete
                your transactions and contact you as needed. Sales tax will be added to
                the price of purchases as deemed required by us. We may change prices at
                any time. All payments shall be in Euros.
                <br />
                You agree to pay all charges at the prices then in effect for your
                purchases and any applicable shipping fees, and you authorize us to charge
                your chosen payment provider for any such amounts upon placing your order.
                If your order is subject to recurring charges, then you consent to our
                charging your payment method on a recurring basis without requiring your
                prior approval for each recurring charge, and until such time as you
                cancel the applicable order. We reserve the right to correct any errors or
                mistakes in pricing, even if we have already requested or received
                payment.
                <br />
                We reserve the right to refuse any order placed through the Services. We
                may, in our sole discretion, limit or cancel quantities purchased per
                person, per household, of per order. These restrictions may include orders
                placed by or under the same customer account, the same payment method,
                and/or orders that use the same billing or shipping address. We reserve
                the right to limit or prohibit orders that in our sole judgement, appear
                1o be placed by dealers, resellers, of distributors.
              </p>

              <h4 id="term-06">6- FREE TRIAL</h4>
              <p>
                We offer a 14-day free trial to new users who register with the Services.
                The account will not be charged and the subscription will be suspended
                until upgraded to a paid version at the end of the free trial.
              </p>

              <h4 id="term-07">7- CANCELLATION</h4>
              <p>
                All purchases are non-refundable. You can cancel your subscription at any
                time by contacting us using the contact information provided below. Your
                cancellation will take effect at the end of the current paid term.
                <br />
                If you are unsatisfied with our Services, please email us at{' '}
                <a href="/">info@deepprom.de</a>
              </p>

              <h4 id="term-08">8- PROHIBITED ACTIVITIES</h4>
              <p>
                You may not access or use the Services for any purpose other than that for
                which we make the Services available. The Services may not be used in
                connection with any commercial endeavors. Except those that are
                specifically endorsed or approved by us. As a user of the Services, you
                agree not to:
                <br />
                <ul>
                  <li>
                    Systematically retrieve data or other content from the Services to
                    create or compile, directly
                  </li>
                  <li>
                    or indirectly, a collection, compilation, database, or directory
                    without written permission from us.
                  </li>
                  <li>
                    Trick, defraud, or mislead us and other users, especially in any
                    attempt to learn sensitive account information Such as user passwords.
                  </li>
                  <li>
                    Circumvent, disable, or otherwise interfere with security-related
                    features of the Services, including features that prevent or restrict
                    the use or copying of any Content or enforce limitations on the use of
                    the Services and or the Content contained therein.
                  </li>
                  <li>
                    Disparage, tarnish, or otherwise harm, in our opinion, us and/or the
                    Services.
                  </li>
                  <li>
                    Use any information obtained from the Services in order to harass,
                    abuse, or harm another person.
                  </li>
                  <li>
                    Make improper use of our Support services or submit false reports of
                    abuse or misconduct
                  </li>
                  <li>
                    Use the Services in a manner inconsistent with any applicable laws of
                    regulations.
                  </li>
                  <li>Engage in unauthorized framing of o linking to the Services.</li>
                  <li>
                    Upload or transmit (or attempt to upload of o transmit) viruses,
                    Trojan horses, of other material including excessive use of capital
                    letters and spamming (continuous posting of repetitive text!), that
                    interferes with any party’s uninterrupted use and enjoyment of the
                    Services or modifies, impairs, disrupts, alters, or interferes with
                    the use, features, functions, operation, or maintenance of the
                    Services.
                  </li>
                  <li>
                    Engage in any automated use of the system, such as using scripts to
                    send comments or messages, or using any data mining, robots, of
                    similar data gathering and extraction tools
                  </li>
                  <li>
                    Delete the copyright or other proprietary rights notice from any
                    Content
                  </li>
                  <li>
                    Attempt to impersonate another user or person or use the username of
                    another user.
                  </li>
                  <li>
                    Upload or transmit (or attempt to upload of o transmit) any material
                    that acts as a passive or Active information collection or
                    transmission mechanism, including without limitation, clear graphics
                    interchange formats (gifs), 1x1 pixels, web bugs, Cookies, or other
                    similar devices (sometimes referred to as &apos;spyware&apos; or
                    ‘passive collection mechanisms&apos; or ‘pcms’)
                  </li>
                  <li>
                    Interfere with, disrupt, or create an undue burden on the Services or
                    the networks or services connected to the Services
                  </li>
                  <li>
                    Harass, annoy, intimidate, or threaten any of our employees or agents
                    engaged in providing any portion of the Services to you.
                  </li>
                  <li>
                    Attempt to bypass any measures of the Services designed to prevent
                    restrict access to the Services, or any portion of the Services.
                  </li>
                  <li>
                    Copy or adapt the Services&apos; software, including but not limited
                    to Flash, PHP, HTML, JavaScript, or other code.
                  </li>
                  <li>
                    Except as permitted by applicable law, decipher, decompile,
                    disassembly, or reverse Engineer any of the software comprising of in
                    any way making up a part of the Services
                  </li>
                  <li>
                    Except as may be the result of standard search engine or Internet
                    browser usage. use, launch, develop, or distribute any automated
                    system, including without limitation, any spider, robot, cheat
                    utility, scraper, or offline reader that accesses the Services, or use
                    of launch any unauthorized script or other software.
                  </li>
                  <li>
                    Use a buying agent or purchasing agent to make purchases on the
                    Services.
                  </li>
                  <li>
                    Make any unauthorized use of the Services, including collecting
                    usernames and/or email addresses of users by electronic or other means
                    for the purpose of sending unsolicited email, or creating user
                    accounts by automated means or under false pretenses.
                  </li>
                  <li>
                    Use the Services as part of any effort to compete with us or otherwise
                    use the Services and/or the Content for any revenue-generating
                    endeavor or commercial enterprise
                  </li>
                  <li>
                    Use your site in an unauthorized way (collecting usernames, email
                    addresses, of users for the purpose of sending unsolicited email, or
                    creating user accounts by automated means or under false pretenses).
                  </li>
                  <li>
                    Use your site in an effort to compete with you, or otherwise use your
                    Site and/or the content for any revenue-generating endeavor or
                    commercial enterprise.
                  </li>
                  <li>
                    Harass, annoy, intimidate, or threaten any of our employees or agents
                    engaged in providing any portion of your Site to you.
                  </li>
                  <li>
                    Use the support services improperly or submit false reports of abuse
                    or misconduct.
                  </li>
                  <li>
                    Systematically retrieving data or content from your Site to create a
                    collection or database without written permission from you
                  </li>
                </ul>
              </p>

              <h4 id="term-09">9- USER GENERATED CONTRIBUTIONS</h4>
              <p>
                The Services may invite you to chat, contribute to, or participate in
                blogs, message boards, online. forums, and other functionality, and may
                provide you with the opportunity to create, Submit, post, display,
                transmit, perform, publish, distribute, or broadcast content and materials
                to us of on the. Services, including but not limited to text, writings,
                video, audio, photographs, graphics, comments, Suggestions, or personal
                information or other material (collectively, ‘Contributions).
                Contributions may be viewable by other users of the Services and through
                third-party websites. AS such, any ‘Contributions you transmit may be
                treated as non-confidential and non-proprietary. When you create of make
                available any Contributions, you thereby represent and warrant that
                <br />
                <ul>
                  <li>
                    The creation, distribution, transmission, public display, or
                    performance, and the accessing, Downloading, or copying of your
                    Contributions do not and will not infringe the proprietary rights,
                    including but not limited to the copyright, patent, trademark, trade
                    secret, or moral rights of any third party.
                  </li>
                  <li>
                    You are the creator and owner of or have the necessary licenses,
                    rights, consents, releases, and permissions to use and to authorize
                    us, the Services, and other users of the Services to use your
                    Contributions in any manner contemplated by the Services and these
                    Legal Terms.
                  </li>
                  <li>
                    You have the written consent, release, and/or permission of each and
                    every identifiable individual person in your Contributions to use the
                    name or likeness of each and every such identifiable individual person
                    to enable inclusion and use of your Contributions in any manner
                    contemplated by the Services and these Legal Terms.
                  </li>
                  <li>Your Contributions are not false, inaccurate, or misleading</li>
                  <li>
                    Your Contributions are not unsolicited or unauthorized advertising,
                    promotional materials, pyramid schemes, chain letters, spam, mass
                    mailings, or other forms of solicitation.
                  </li>
                  <li>
                    Your Contributions are not obscene, lewd, lascivious, filthy, violent,
                    harassing, libelous, slanderous, or otherwise objectionable (as
                    determined by us).
                  </li>
                  <li>
                    Your Contributions do not ridicule, mock, disparage, intimidate, or
                    abuse anyone.
                  </li>
                  <li>
                    Your Contributions are not used to harass or threaten (in the legal
                    sense of those terms) any other person and to promote violence against
                    a specific person or class of people.
                  </li>
                  <li>
                    Your contributions do not violate any applicable Law, regulation, of
                    rule
                  </li>
                  <li>
                    Your Contributions do not violate the privacy of publicity rights of
                    any third party.
                  </li>
                  <li>
                    Your Contributions do not violate any applicable law concerning child
                    pornography, or otherwise intended to protect the health or well-being
                    of minors.
                  </li>
                  <li>
                    Your Contributions do not include any offensive comments that are
                    connected to race, national origin, gender, sexual preference, or
                    physical handicap
                  </li>
                  <li>
                    Your Contributions do not otherwise violate, or link to material that
                    violates, any provision of these Legal Terms, or any applicable law or
                    regulation.
                  </li>
                </ul>
                Any use of the Services In violation of the foregoing violates these Legal
                Terms and may result in, among other things, termination, or suspension of
                your rights to use the Services
              </p>

              <h4 id="term-10">10- CONTRIBUTION LICENCE</h4>
              <p>
                By posting your contributions to any part of the Services or making
                Contributions accessible to the Services by linking your account from the
                Services to any of your social networking accounts, you automatically
                grant, and you represent and warrant that you have the right to grant, to
                us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive,
                transferable, royalty-free, fully-paid worldwide right, and license to
                host, use, copy, reproduce, disclose, sell, resell, publish, broadcast
                retitle, archive, store, cache, publicly perform, publicly display,
                reformat, translate, transmit, excerpt (in whole or in part), and
                distribute such Contributions (including, without limitation, your image
                and voice) for any purpose, commercial advertising, or otherwise, and to
                prepare derivative works of or incorporate into other works, such
                Contributions, and grant and authorize sublicences of the foregoing. The
                use and distribution may occur in any media formats and through any media
                channels.
                <br />
                This license will apply to any form, media, or technology now known or
                hereafter developed, and includes our use of your name, company name, and
                franchise name, as applicable, and any of the trademarks, service marks,
                trade names, logos, and personal and commercial images you provide. You
                waive all moral rights in your contributions, and you warrant that moral
                rights have not otherwise been asserted in your contributions.
                <br />
                We do not asset any ownership over your contributions. You retain full
                ownership of all of your Contributions and any intellectual property
                rights, or other proprietary rights associated with your Contributions. We
                are not liable for any statements or representations in your contributions
                provided by you in any area on the Services. You are solely responsible
                for your contributions to the Services and you expressly agree to
                exonerate us from any and all responsibility and to refrain from any legal
                action against us regarding your contributions.
                <br />
                We have the right, in our sole and absolute discretion, (1) to edit,
                redact, or otherwise change any Contributions (2) to re-categories any
                Contributions to place them in more appropriate locations on the Services,
                and (3) to pre-screen or delete any Contributions at any time and for any
                reason without notice. We have no obligation to monitor your
                contributions.
              </p>

              <h4 id="term-11">11- SOCIAL MEDIA</h4>
              <p>
                As part of the functionality of the Services, you may link your account
                with online accounts you have with third-party service providers (each
                such account, a Third-Party Account) by either (1) providing your
                Third-Party Account login information through the Services; or (2)
                allowing us to access your Third-Party Account, as is permitted under the
                applicable terms and conditions that govern your use of each Third-Party
                Account. You represent and warrant that you are entitled to disclose your
                Third-Party Account login information to us and/or grant us access to your
                Third-Party Account without breach by you of any of the terms and
                conditions that govern your use of the applicable Third-Party Account, and
                without obligating us to pay any fees or making us subject to any usage
                limitations imposed by the third-party service provider of the Third-Party
                Account By granting us access to any Third-Party Accounts, you understand
                that (1) we may access, make available, and store (if applicable) any
                content that you have provided to and stored in your Third- Party Account
                (the Social Network Content) so that it is available on and through the
                Services via your account, including without limitation any friend lists
                and (2) we may submit to and receive from your Third-Party Account
                additional information to the extent you are notified when you link your
                account with the Third-Party Account Depending on the Third-Party Accounts
                you choose and subject to the privacy settings that you have set in such
                Third-Party Accounts, personally identifiable information that you post to
                your Third-Party Accounts may be available on and through your account on
                the Services. Please note that if a Third-Party Account or associated
                service becomes unavailable or our access to such Third-Party Account is
                terminated by the third-party service provider, then Social Network
                Content may no longer be available on and through the Services. You will
                have the ability to disable the connection between your account on the
                Services and your Third-Party Accounts at any time.
                <br />
                <b>
                  PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE
                  PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY
                  BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS.
                </b>
                <br />
                We make no effort to review any Social Network Content for any purpose,
                including but not limited to, for accuracy, legality, or non-infringement,
                and we are not responsible for any Social Network Content. You acknowledge
                and agree that we may access your email address book associated with a
                Third-Party Account and your contacts list stored on your mobile device or
                tablet computer solely for purposes of identifying and informing you of
                those contacts who have also registered to use the Services. You can
                deactivate the connection between the Services and your Third-Party
                Account by contacting us using the contact information below or through
                your account settings (if applicable). We will attempt to delete any
                information stored on our servers that was obtained through such
                Third-Party Account, except the username and profile picture that become
                associated with your account.
              </p>

              <h4 id="term-12">12- SERVICES MANAGEMENT</h4>
              <p>
                We reserve the right, but not the obligation, to: (1) monitor the Services
                for violations of these Legal Terms; (2) take appropriate legal action
                against anyone who, in our sole discretion, violates the law or these
                Legal Terms, including without limitation, reporting Such user to Law
                enforcement authorities; (3) in our sole discretion and without
                limitation, refuse, restrict access to, limit the availability of, or
                disable (to the extent technological feasible) any of your Contributions
                or any portion thereof, (4 in our sole discretion and without limitation,
                notice, or liability, to remove from the Services or otherwise disable all
                files and content that are excessive in size or are in any way burdensome
                to our systems; and (5) otherwise manage the Services in a manner designed
                to protect our nights and property and to facilitate the proper
                functioning of the Services.
              </p>

              <h4 id="term-13">13- PRIVACY POLICY</h4>
              <p>
                We care about data privacy and security. By using the Services, you agree
                to be bound by our Privacy Policy posted on the Services, which is
                incorporated into these Legal Terms. Please be advised the Services are
                hosted in Germany. If you access the Services from any other region of the
                world with Laws or other requirements governing personal Data collection,
                use, or disclosure that differ from applicable laws in Germany, then
                through your continued use of the Services, you are transferring your data
                to Germany, and you expressly consent to have your data transferred to and
                processed in Germany
              </p>

              <h4 id="term-14">14- COPYRIGHT INFRINGEMENTS</h4>
              <p>
                We respect the intellectual property rights of others. If you believe that
                any material available on or through the Services infringes upon any
                copyright you own or control, please immediately notify us using the
                contact information provided below (a Notification’), A copy of your
                Notification will be sent to the person who posted or stored the material
                addressed in the Notification. Please be advised that pursuant to
                applicable law you may be held liable for damages if you make material
                misrepresentations in a Notification. Thus, if you are not sure that
                material located on or linked to by the Services infringes your copyright
                you should consider first contacting an attorney.
              </p>

              <h4 id="term-15">15- TERM AND TERMINATION</h4>
              <p>
                These Legal Terms shall remain in full force and effect while you use the
                Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE
                RESERVE THE RIGHT TO IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR
                LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING
                CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON,
                INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY,
                OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAWN OR
                REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR
                DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY
                TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
                <br />
                If we terminate or suspend your account for any reason, you are prohibited
                from registering and creating a new account under your name, a fake or
                borrowed name, or the name of any third party even if you may be acting on
                behalf of the third party. In addition to terminating or suspending your
                account, we reserve the right to take appropriate legal action, including
                without limitation pursuing civil, criminal, and injunctive redress
              </p>

              <h4 id="term-16">16- MODIFICATIONS AND INTERRUPTIONS</h4>
              <p>
                We reserve the right to change, modify, or remove the contents of the
                Services at any time or for any reason at our sole discretion without
                notice. However, we have no obligation to update any Information on our
                Services. We will not be liable to you or any third party for any
                modification, price change, suspension, or discontinuance of the Services
                <br />
                We cannot guarantee the Services will be available at all times. We may
                experience hardware, software, or other problems or need to perform
                maintenance related to the Services, resulting in interruptions, delays,
                or errors. We reserve the right to change, revise, update, suspend
                discontinue, or otherwise modify the Services at any time or for any
                reason without notice to you. You agree that we have no ability whatsoever
                for any loss, damage, or inconvenience caused by your inability to access
                or use the Services during any downtime or discontinuance of the Services
                Nothing in these Legal Terms will be construed to obligate us to maintain
                and support the Services or to supply any corrections, updates, or
                releases in connection therewith.
              </p>

              <h4 id="term-17">17- GOVERNING LAW</h4>
              <p>
                These Legal Terms are governed by and interpreted following the laws of
                Germany, and the use of the United Nations Convention of Contracts for the
                international Sales of Goods is expressly excluded. If your habitual
                residence is in the EU, and you are a consumer, you additionally possess
                the protection provided to you by obligatory provisions of the law in your
                country to residence. QuickSteps and yourself both agree to submit to the
                non-exclusive jurisdiction of the courts of____________, which means that
                you may make a claim to defend your consumer protection rights in regard
                to these Legal Terms in Germany, or in the EU country in which you reside.
              </p>

              <h4 id="term-18">18- DISPUTE RESOLUTION</h4>
              <p>
                The European Commission provides an online dispute resolution platform,
                which you can access. If you would like to bring this subject to our
                attention, please contact us.
              </p>

              <h4 id="term-19">19- CORRECTIONS</h4>
              <p>
                There may be information on the Services that contains typographical
                errors, inaccuracies, or omissions, including descriptions, pricing,
                availability, and various other information. We reserve the right to
                connect any errors, inaccuracies, or omissions and to change or update the
                information on the Services at any time, without prior notice
              </p>

              <h4 id="term-20">20- DISCLAIMER</h4>
              <p>
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE
                THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK TO THE FULLEST
                EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
                IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT
                LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FORA
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR
                REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES CONTENT
                OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE
                SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1)
                ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS (2) PERSONAL
                INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR
                ACCESS TO AND USE OF THE SERVICES (3) ANY UNAUTHORISED ACCESS TO OR USE OF
                OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR
                FINANCIAL INFORMATION STORED THEREIN. (4) ANY INTERRUPTION OR CESSATION OF
                TRANSMISSION TO OR FROM THE SERVICES (5) ANY BUGS, VIRUSES, TROJAN HORSES
                OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY
                THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND
                MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF
                THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE
                VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
                RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD
                PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR
                MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE
                WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
                TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR
                SERVICES AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM
                OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGEMENT AND EXERCISE
                CAUTION WHERE APPROPRIATE.
              </p>

              <h4 id="term-21">21- LIMITATIONS OF LIABILITY</h4>
              <p>
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO
                YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY,
                INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST
                REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE
                SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES
                NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY
                TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION,
                WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US
                DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING
                CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON
                IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF
                THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR
                LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
              </p>

              <h4 id="term-22">22- INDEMNIFICATION</h4>
              <p>
                You agree to defend, indemnify and hold us harmless, including our
                subsidiaries, affiliates, and all of our respective officers, agents,
                partners, and employees, from and against any loss, damage, lability,
                claim, or demand, including reasonable attorneys&apos; fees and expenses,
                made by any third party due to or arising out of (1) your Contributions
                (2) use of the Services; (3) breach of these Legal Terms: (4) any breach
                of your representations and warranties set forth in these Legal Terms: (5)
                your violation of the rights of a third party, including but not limited
                to intellectual property rights or (6) any over harmful act toward any
                other user of the Services with whom you connected via the Services.
                Notwithstanding the foregoing, we reserve the right, at your expense, to
                assume the exclusive defense and control of any matter for which you are
                required to indemnity us, and you agree to cooperate, at your expense,
                with our defense of such claims. We will use reasonable efforts to notify
                you of any such claim, action, or proceeding which is subject to this
                indication upon becoming aware of it.
              </p>

              <h4 id="term-23">23- USER DATA</h4>
              <p>
                We will maintain certain data that you transmit to the Services for the
                purpose of managing the performance of the Services, as well as data
                relating to your use of the Services. Although we perform regular routine
                backups of data, you are solely responsible for all data that you transmit
                or that relates to any activity you have undertaken using the Services.
                You agree that we shall have no liability to you for any loss or
                corruption of any such data, and you hereby waive any right of action
                against us arising from any such loss or corruption of such data.
              </p>

              <h4 id="term-24">
                24- ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
              </h4>
              <p>
                Visiting the Services, sending us emails, and completing online forms
                constitute electronic communications. You consent to receive electronic
                communications, and you agree that all agreements, notices, disclosures,
                and other communications we provide to you electronically, via email and
                on the Services, satisfy any legal requirement that such communication be
                in writing YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
                CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF
                NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY
                US OR VIA THE SERVICES You hereby wave any rights or requirements under
                any statutes, regulations, rules, ordinances, or other laws in any
                jurisdiction which require an original signature or delivery or retention
                of non- electronic records, or to payments or the granting of credits by
                any means other than electronic means.
              </p>

              <h4 id="term-25">25- CALIFORNIA USERS AND RESIDENTS</h4>
              <p>
                If any complaint with us is not satisfactorily resolved, you can contact
                the Complaint Assistance Unit of the Division of Consumer Services of the
                California Department of Consumer Affairs in writing at 1625 North Market
                Blvd., Suite 112. Sacramento, California $5834 or by telephone at (800)
                952-5210 or (916) 445-1254.
              </p>

              <h4 id="term-26">26- MISCELLANEOUS</h4>
              <p>
                These Legal Terms and any policies or operating rules posted by us on the
                Services or in respect to the Services constitute the entire agreement and
                understanding between you and us. Our au to exercise or enforce any right
                or provision of these Legal Terms shall not operate as a waiver of such
                right or provision. These Legal Terms operate to the fullest extent
                permissible by law. We may assign any or all of our rights and obligations
                to others at any time. We shall not be responsible or liable for any loss,
                damage, delay, or failure to act caused by any cause beyond our reasonable
                control. If any provision or part of a provision of these Legal Terms is
                determined to be unlawful void or unenforceable, that provision or part of
                the provision is deemed severable from these Legal Terms and does not
                affect the validity and enforceability of any remaining provisions. There
                is no joint venture, partnership, employment or agency relationship
                created between you and us as a result of these Legal Terms or use of the
                Services. You agree that these Legal Terms will not be construed against
                us by virtue of having drafted them. You hereby waive any and all defenses
                you may have based on the electronic form of these Legal Terms and the
                lack of signing by the parties hereto to execute these Legal Terms.
              </p>

              <h4 id="term-27">27- CONTACT US</h4>
              <p>
                In order to resolve a complaint regarding the Services or to receive
                further information regarding use of the Services, please contact us at
                <br />
                <b>QuickSteps</b>
                <br />
                <b>Company Name</b>
                <br />
                DEEPSOFT YAZILIM BILGISAYAR SANAYi VE TiCARET LiMiTED SiRKETi
                <br />
                <b>Company Address</b>
                <br />
                CUMHURIYET SB MAH. EKE FENCE, 1 SK. NO:2 K, 20350 Çardak/Denizli, Türkiye
                <br />
                <b>Email Address</b>
                <br />
                info@deepprom.de
              </p>
            </article>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
