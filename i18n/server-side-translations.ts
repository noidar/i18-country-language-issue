import { UserConfig } from "next-i18next";
// eslint-disable-next-line no-restricted-imports
import { serverSideTranslations as nextI18nextServerSideTranslations } from "next-i18next/serverSideTranslations";
import { DEFAULT_LOCALE as EXPLICIT_DEFAULT_LOCALE } from "./default-locale";

// Checking "default" name of local before calling serverSideTranslations from next-i18next/serverSideTranslations
// https://github.com/vercel/next.js/discussions/18419
export const serverSideTranslations = (
    contextLocale: string,
    namespacesRequired?: string[] | undefined,
    configOverride?: UserConfig | null,
    extraLocales?: string[] | false
) => {
    const locale = contextLocale === "default" ? EXPLICIT_DEFAULT_LOCALE : contextLocale;

    return nextI18nextServerSideTranslations(locale, namespacesRequired, configOverride, extraLocales);
};
