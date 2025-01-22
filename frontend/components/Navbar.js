import { StyleSheet, View } from "react-native";
import NavbarButton from "./NavbarButton";
import SettingsIcon from "../assets/buttonIcons/settings.svg";
import CottageIcon from "../assets/buttonIcons/cottage.svg";
import LocalLibraryIcon from "../assets/buttonIcons/local_library.svg";

export default function Navbar() {
  return (
    <View style={styles.navegao}>
      <View style={[styles.navbar, styles.navegao1ShadowBox]}>
        <NavbarButton icon={<SettingsIcon width={24} height={24} />} />
        <NavbarButton icon={<CottageIcon width={24} height={24} />} />
        <NavbarButton icon={<LocalLibraryIcon width={24} height={24} />} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: 36,
    height: 36,
    backgroundColor: "#dadada",
  },
  navbar: {
    flexDirection: "row",
    backgroundColor: "#dadada",
    gap: 90,
    alignSelf: "stretch",
    justifyContent: "center",
    paddingVertical: 24,
  },
  navegao1ShadowBox: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  navegao1FlexBox: {
    paddingHorizontal: 24,
    flexDirection: "row",
    backgroundColor: "#dadada",
    alignSelf: "stretch",
    alignItems: "center",
  },
  navText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    textAlign: "center",
  },
  textoSimples: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 32,
    marginTop: -10,
    justifyContent: "center",
  },
  botoParent: {
    paddingHorizontal: 12,
    alignSelf: "stretch",
    alignItems: "center",
  },
  navegao: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    bottom: 0,
  },
});
