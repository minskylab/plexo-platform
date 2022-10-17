import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { MoonStars, Sun, ChevronDown, World } from "tabler-icons-react";
import { Title, Group, Select } from "@mantine/core";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

type HelloWorldProps = {
  name?: string;
};

const HelloWorld = ({ name = "MyApp" }: HelloWorldProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { t, lang } = useTranslation("home");
  const router = useRouter();
  /* console.log(router.locale); */
  const handleChangeLanguage = (e: string) => {
    router.locale = e === "en" ? "en" : "es";
    router.locale === "en" ? router.push("/", "/", { locale: "en" }) : router.push("/es");
  };

  return (
    <Group>
      <Title>
        {t("greeting")} {name}
      </Title>
      <ActionIcon onClick={() => toggleColorScheme()} size="lg" variant="default">
        {colorScheme === "dark" ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
      <Select
        defaultValue={router.locale}
        onChange={(e: string) => {
          handleChangeLanguage(e);
        }}
        data={[
          { value: "en", label: "English" },
          { value: "es", label: "Español" },
        ]}
        icon={<World size={18} />}
        rightSection={<ChevronDown size={18} />}
        styles={{ rightSection: { pointerEvents: "none" } }}
        style={{ width: 130 }}
      />
    </Group>
  );
};

export { HelloWorld };
