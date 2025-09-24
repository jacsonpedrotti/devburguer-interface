import { navLinks } from "./navLinks";
import Logo from "../../assets/logo.svg"
import { useResolvedPath } from "react-router-dom";
import { SignOutIcon } from "@phosphor-icons/react";
import { Container, NavLink, NavLinkContainer, Footer } from "./styles";
import { useUser } from "../../hooks/UserContext";

export function SideNavAdmin() {
    const { logout } = useUser();
    const { pathname } = useResolvedPath()
    return (
        <Container>
            <img src={Logo} alt="Hamburguer Logo DevBurguer" />
            <NavLinkContainer>
                {navLinks.map((link) => (
                    <NavLink key={link.id} to={link.path} $isActive={pathname === link.path}>
                        {link.icon}
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </NavLinkContainer>
            <Footer>
                <NavLink to="/login" onClick={logout}>
                    <SignOutIcon />
                    <p>Sair</p>
                </NavLink>
            </Footer>
        </Container>
    );
}