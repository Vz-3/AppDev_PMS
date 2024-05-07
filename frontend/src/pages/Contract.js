import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/globalT.css"; // Assuming you have global styles

const Contract = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/Login"; // Redirect to the login page
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="#Dashboard">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/TenantHome">Home</Nav.Link>
              <Nav.Link href="/TenantProfile">Profile</Nav.Link>
              <Nav.Link href="/Contract">Contract</Nav.Link>
              <Nav.Link href="/Message">Message</Nav.Link>
            </Nav>
            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  User
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={styles.container} className="content-below-navbar">
        <h1 style={styles.header}>CONTRACT OF LEASE</h1>
        <p>1. SUBJECT OF THE LEASE</p>
        <p>
          The subject of this Contract Of Lease is the indicated room in the
          attached ANNEX A of a four (4) storey dormitory building located at
          1077 Chino Roces Avenue corner 4363 Montojo Street, Brgy. Sta. Cruz,
          Makati City
        </p>
        {<p>2. TERM OF THE LEASE</p>}
        {
          <p>
            The lease shall be as indicated in the attached ANNEX A. The lease
            may be extended or renewed upon mutual agreement of the lessee and
            the lessor. For administrative expediency, the lease is deemed
            automatically renewed for the same contracted period unless
            otherwise specified by either party. In the event the lessor or the
            lessee will not extend or renew the lease, the lessor or the lessee
            must provide a written notice Of their intention not to extend or
            renew the lease at least thirty (30) days before the end of the
            lease.
          </p>
        }
        {<p>3. RENT AND SECURITY DEPOSIT</p>}
        {
          <p>
            The parties agree that the monthly rental Of the Leased Premises and
            the 1 month security deposit shall be as indicated in the attached
            ANNEX A The Security Deposit will ensure faithful compliance by the
            LESSEE of the covenants hereof and to answer for any bills for
            water, electricity, telephone and other utility bills if paid by the
            LESSOR for the account of the LESSEE, and, any provable damages to
            the Leased Premises caused by the LESSEE. The balance, if any, shall
            be refunded by the LESSOR to the LESSEE, upon settlement of such
            accounts which shall not exceed sixty (60) days after termination of
            this contract and return of the premises, whichever comes earlier.
            It is also further understood that the Security Deposit shall in no
            case be applied as Rent. 3.1 Upon execution of this contract and
            prior to move-in, LESSEE shall pay to the LESSOR the monthly rentals
            and 1 month security deposit based on the timetable indicated in the
            attached ANNEX A. 3.2 In the event LESSEE fails to pay the
            subsequent monthly rents in cash on the agreed dates or if the
            postdated checks to secure the subsequent monthly rents bounce on
            the agreed date or fails to pay his assessed utility bills as
            presented by the building admin, the LESSOR reserves the right to
            not allow the defaulting LSSEE entry to the building premises,
            terminate the lease, forfeit the security deposit, and lease out the
            rented unit, without incurring any further liability to the LESSEE
          </p>
        }
        {<p>4. UTILITIES</p>}
        {
          <p>
            All charges and expenses for gas, water, electric current,
            telephone, cable fees and other public utilities now installed or
            hereinafter to be installed shall be for the account of the LESSEE.
            The LESSEE will be billed their share of the electric and water
            bills as billed by the building admin and such bills are to be
            settled upon presentation by the building admin.
          </p>
        }
        {<p>5. USE OF PREMISE</p>}
        {
          <p>
            The Leased Premises shall be used strictly for residential purposes
            only and shall not be converted to any other purpose without the
            prior written consent of the LESSOR. The LESSEE warrants to the
            LESSOR that the premises will not be used for immoral, illegal or
            criminal purposes, like prohibited drugs, prostitution or similar
            illegal activities and the LESSEE agrees to hold the LESSOR
            completely free and harmless in the event that the leased premises
            are proven to be used for immoral or illegal purpose. The LESSEE
            shall comply with the existing rules and regulations set by the
            lessor / administrative office, any and all reasonable rules and
            regulations, ordinances and laws issued by health or duly other
            constituted local or national authorities arising from or regarding
            the use, occupancy, sanitation, and safety Of the LEASED PREMISES.
            In the event the leased premises are used for immoral or illegal
            purposes, the LESSEE shall be fully responsible or accountable for
            whatever consequences the government authorities may impose or take
            action, and LESSOR may terminate the lease and forfeit the Security
            Deposit and unused rent in its favor. Cooking (except for heating of
            instant noodles or similar food items) is strictly not allowed.
            liberate damage to the unit by the lessee will be a ground for the
            lessor to immediately terminate the lease and forfeit all security
            deposit and unused rent, and the lessor reserves the right to obtain
            legal remedies as deemed necessary by the situation.
          </p>
        }
        {<p>6. ASSIGNMENT</p>}
        {
          <p>
            The LESSEE may not directly or indirectly assign, sublease,
            transfer, convey, mortgage or in any way encumber its right of
            possession and lease over the Leased Premises without the prior
            written consent of the LESSOR.
          </p>
        }
        {<p>7. IMPROVEMENTS/MOVABLE FURNISHINGS</p>}
        {
          <p>
            The LESSEE shall not paint, make alterations or additions to, or
            improvements upon the Leased Premises, including electrical and
            plumbing installations thereon. Upon the expiration Of the lease,
            all fixed and permanent improvements introduced or built on the
            Leased Premises by the LESSEE with the approval of the LESOR can and
            may be removed by the LESSEE without causing damage to the Leased
            Premises. In case of the LESSEE's failure to remove the improvements
            at the expiration or termination of the lease, or in case it is not
            possible to remove the improvements without defacing or causing
            damage to the Leased Premises, it Shall be the LESSOR's right to
            appropriate the improvements without any obligation on the latter's
            part to pay for its value or costs to the LESSEE. The LESSEE may
            install movable fumishings, appliances and decorative items within
            the Leased Premises, which shall remain the property of the LESSEE.
            The LESSEE shall take care that the removal of the items shall not
            cause any damage to the Leased Premises. In case of the LESSEE's
            failure to remove the improvements at the expiration or termination
            of the lease, or in case it is not possible to remove the
            improvements without defacing or causing damage to the Leased
            Promises, it shall be the LESSORs right to appropriate the
            improvements without any obligation on the latter's part to pay for
            its value or cost to the LESSEE. The LESSOR shall, furthermore, have
            the option whether or not to charge the LESSEE with the cost of
            removing the improvements and restoring the Leased Premises to its
            original condition.
          </p>
        }
        {<p>8. SANITATION AND REPAIRS</p>}
        {
          <p>
            The LEESEE shall keep the LEASED PREMISES clean, livable and in
            sanitary condition and upkeep it at all times. The LESSOR shall be
            responsible for all major repairs on the premises and on the water,
            electric/plumbing and sewage installation, except repairs due to the
            fault or negligence of the LESSEE, guests or visitors. The LESSOR
            reserves the right to charge the LESSEE cost of repairs for damage
            to the building due to the negligence of the LESSEE or his guests.
            The LESSEE shall not keep, deposit, or store in the LEASED PREMISES
            any obnoxious, noxious, toxic and inflammable materials and/or
            substance.
          </p>
        }
        {<p>9. THIRD PARTY LIABILITY</p>}
        {
          <p>
            The LESSEE during his occupancy of the Leased Premises shall hold
            the LESSOR free and harmless from any damage or liability or
            responsibility to any person or property arising solely out of, or
            as a consequence of, the misuse of the Leased Premises by the LESEE,
            his agents and guests.
          </p>
        }
        {<p>10. RIGHT TO ENTER LEASED PREMISES</p>}
        {
          <p>
            The LESSOR reserves the right to enter and inspect the premises at
            reasonable time of the day for the purpose of inspecting the Leased
            premises and/or for the purposes of making any repairs and ensuring
            proper upkeep and maintenance of the Leased Premises. The LESSEE,
            upon termination or expiration of this Contract, shall quietly and
            peacefully deliver and surrender the LEASED PREMISES to the LESSOR,
            in the same condition in which it was received, save what has been
            lost or impaired by the lapse of time, by ordinary wear and tear or
            by fortuitous events.
          </p>
        }
        {<p>11. PRETERMINATION OF CONTRACT</p>}
        {
          <p>
            This lease is guaranteed for the agreed term of the lease as signed
            in this lease contract and should the LESSEE pre terminate the
            Contract anytime during the lease period, all unused advance rent
            and security deposits shall be forfeited in favor of the LESSOR as
            by way of liquidated damages. Upon receipt of said notice to
            terminate, the LESSOR may show the PREMISES to prospective tenants
            at reasonable hours and with twenty-four (24) hour prior notice.
          </p>
        }
        {<p>12. RETURN OF THE LEASED PREMISES</p>}
        {
          <p>
            Upon termination of this Lease or any renewal or extension hereof,
            the LESSEE shall peacefully vacate the Leased Premises and restore
            possession thereof including the return of the keys and RFID card to
            the LESSOR in the same condition as it was at the time of delivery,
            save what has been lost or impaired by the lapse of time, ordinary
            wear and tear or by fortuitous event.
          </p>
        }
        {<p>13. EXPIRATION / TERMINATION / CANCELLATION</p>}
        {
          <p>
            The LESSEE, upon expiration or termination and/or cancellation of
            the lease, shall promptly surrender the Leased Premises to the
            LESSOR, in the same tenantable condition in which the LESSEE
            received it, devoid of all occupants, furniture, articles and
            effects, subject to the provisions of Section 8. Thirty (30) days
            prior to the return of the Leased premises, the LESSOR may show the
            premises to prospective tenants through his representatives at
            reasonable hours by prior appointment and with notice to the LESSEE.
          </p>
        }
        {<p>14. NOTICES</p>}
        {
          <p>
            All notices sent by the LESSOR to the LESSEE during the Lease Period
            shall be deemed be duly served if delivered personally, by
            registered mail/courier to the LESSEE at the address of the LEASED
            PREMISES or at the above-stated address or through electronic mail
            as indicated in the Tenant Information Form. All notices sent by the
            LESSEE to the LESSOR shall be given personally, by registered
            mail/courier to the LESSORs address stated above or in its
            subsequent principal place of business or through electronic mail at
            kmkresidences@gmail.com.
          </p>
        }
        {<p>15. BREACH OF CONTRACT</p>}
        {
          <p>
            Violation of either party of any of the terms or conditions of this
            Contract shall entitle the aggrieved party to terminate this
            contract by giving written notice to the other party of such
            violation and intention to pre-terminate. Any breach or violation of
            any terms and conditions of this Contract by a party shall be
            rectified within fifteen (15) days Of written notification of the
            aggrieved party. Failure to rectify the violation will automatically
            give the aggrieved party the right to terminate this Contract of
            Lease even prior to the expiration of the stipulated term by thirty
            (30) days written notice to the other party.
          </p>
        }
        {<p>16. WAIVER CLAUSE</p>}
        {
          <p>
            Failure of either party to insist in one or more instances upon
            strict performance of any of the covenants of this lease or exercise
            any portion therein contained, shall not be construed as abandonment
            or cancellation or waiver of such covenant or option. No waiver by
            either party shall be deemed to have been made unless expressed in
            writing and signed by the party or parties concerned.
          </p>
        }
        {<p>17. COVERAGE OF CONTRACT</p>}
        {
          <p>
            All terms and conditions of this Contract of Lease shall be binding
            upon heirs, executors, administrators, principals, successors and
            assign of the parties hereof.
          </p>
        }
        {<p>18. SEVERABILITY CLAUSE</p>}
        {
          <p>
            In case any provision in this Contract of Lease is declared void,
            the provisions not so declared shall remain valid and binding.
          </p>
        }
        {<p>19. APPLICABLE LAW</p>}
        {
          <p>
            This Contract of Lease shall be governed by Philippine Laws. The
            parties herein agree that the Courts of Manila shall have exclusive
            jurisdiction over any case filed in connection with this Contract of
            Lease.
          </p>
        }
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "1200px", // Maximum width to accommodate larger screens
    width: "100%", // Uses full width of the viewport up to the max-width
    margin: "80px auto", // Increases margin to give space below the navbar
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    paddingTop: "2600px", // Adjust content below the Navbar
    overflow: "auto", // Adds scroll if content overflows
  },
  header: {
    textAlign: "center",
    color: "#333",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
  },
  rulesContainer: {
    backgroundColor: "#f8f8f8",
    padding: "15px",
    marginTop: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  scheduleContainer: {
    backgroundColor: "#f8f8f8",
    padding: "15px",
    marginTop: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  p:{
    color: "#000000"
  }
};

export default Contract;
