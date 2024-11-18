import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

type Props = {
  // Add custom props here
};

const Homepage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clientSideLanguageChange = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
  };

  const changeTo = router.locale === "en" ? "de" : "en";
  // const changeTo = i18n.resolvedLanguage === 'en' ? 'de' : 'en'

  return (
    <>
      <main>
        <Header heading={t("h1")} title={t("title")} />

        <div>
          <Link href="/" locale={changeTo}>
            <button>{t("change-locale", { changeTo })}</button>
          </Link>
          <button onClick={() => onToggleLanguageClick(changeTo)}>
            {t("change-locale", { changeTo })}
          </button>

          <button onClick={() => clientSideLanguageChange(changeTo)}>
            {t("change-locale", { changeTo }) + "clientSideLanguageChange"}
          </button>
          <Link href="de/at/details">
            <button type="button">{t("to-second-page")}</button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "footer"])),
  },
});

export default Homepage;
