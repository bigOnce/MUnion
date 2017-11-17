/**
 * Routes for express app
 */
import passport from "passport";
import unsupportedMessage from "../db/unsupportedMessage";
import { controllers, passport as passportConfig } from "../db";
import Constant from "../../constant";
import { scrapeContainers } from "../db/mongo/service/news/scrape";

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const generalController = controllers && controllers.general;
const parseController = controllers && controllers.parse;
const scrapeController = controllers && controllers.scrape;
const sendFileController = controllers && controllers.sendfile;
const audioNewsController = controllers && controllers.audionews;
const filtersController = controllers && controllers.news.filters;

export default app => {
  // user routes
  if (usersController) {
    app.post("/sessions", usersController.login);
    app.post("/users", usersController.signUp);
    app.delete("/sessions", usersController.logout);
  } else {
    console.warn(unsupportedMessage("users routes"));
  }

  if (passportConfig && passportConfig.google) {
    // google auth Redirect the user to Google for authentication. When complete,
    // Google will redirect the user back to the application at /auth/google/return
    // Authentication with google requires an additional scope param, for more info
    // go here
    // https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get(
      "/auth/google",
      passport.authenticate("google", {
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email"
        ]
      })
    );

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get(
      "/auth/google/callback",
      passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login"
      })
    );
  }

  ///////////////////////////////////////////////////////////////
  // TOPIC
  ///////////////////////////////////////////////////////////////
  if (topicsController) {
    app.get("/topic", topicsController.all);
    app.post("/topic/:id", topicsController.add);
    app.put("/topic/:id", topicsController.update);
    app.delete("/topic/:id", topicsController.remove);
  } else {
    console.warn(unsupportedMessage("topics routes"));
  }

  ///////////////////////////////////////////////////////////////
  // GENERAL
  ///////////////////////////////////////////////////////////////
  if (generalController) {
    app.get("/general/nodetypes", generalController.noteTypeList);
  } else {
    console.warn(unsupportedMessage("general routes"));
  }

  ///////////////////////////////////////////////////////////////
  // PARSE
  ///////////////////////////////////////////////////////////////
  if (parseController) {
    app.post("/api/parse", parseController.parseURL);
  } else {
    console.warn(unsupportedMessage("general routes"));
  }

  ///////////////////////////////////////////////////////////////
  // SCRAPE
  ///////////////////////////////////////////////////////////////
  if (scrapeController) {
    app.get("/api/scrape/publisher", scrapeController.scrapePublishers);
    app.get("/api/scrape/container", scrapeController.scrapeContainers);
    app.get("/api/scrape/content", scrapeController.scrapeContents);
  } else {
    console.warn(unsupportedMessage("scrape routes"));
  }

  ///////////////////////////////////////////////////////////////
  // FILES
  ///////////////////////////////////////////////////////////////
  if (sendFileController) {
    app.get("/src/mp3", sendFileController.sendMp3File);
    app.get(
      Constant.SRC_IMAGE_PATH + "/:path",
      sendFileController.sendImageFile
    );
  } else {
    console.warn(unsupportedMessage("scrape routes"));
  }

  ///////////////////////////////////////////////////////////////
  // AUDIO
  ///////////////////////////////////////////////////////////////
  if (audioNewsController) {
    app.get("/news/t_audio", audioNewsController.all);
  } else {
    console.warn(unsupportedMessage("scrape routes"));
  }

  ///////////////////////////////////////////////////////////////
  // FILTERS
  ///////////////////////////////////////////////////////////////
  if (filtersController) {
    app.post("/api/news/setfilter", filtersController.setFilter);
  } else {
    console.warn(unsupportedMessage("scrape routes"));
  }
};
