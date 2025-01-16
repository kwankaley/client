import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_PAT,
});

export const PushCodeButton = () => {
  const handleClick = async () => {
    const code = 'print("Hello Kaley!")';
    const path = "scripts/hello_script.py";
    try {
      let sha = null;

      try {
        const fileDetails = await octokit.request(
          `GET /repos/kwankaley/client/contents/${path}`,
          {
            owner: "kwankaley",
            repo: "client",
            path: path,
          }
        );

        sha = fileDetails.data.sha;
      } catch (fetchError) {
        if (fetchError.status === 404) {
          console.log("File does not exist. Proceeding to create it...");
        } else {
          throw fetchError;
        }
      }

      const response = await octokit.request(
        `PUT /repos/kwankaley/client/contents/${path}`,
        {
          owner: "kwankaley",
          repo: "client",
          path: path,
          message: "Pushing txt file with the click of a button",
          committer: {
            name: "Kaley Kwan",
            email: "kaley@aira-technology.com",
          },
          content: btoa(code),
          ...(sha && { sha }),
          branch: "test-push-code",
        }
      );

      console.log("File successfully uploaded to GitHub!", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Push code</button>
    </div>
  );
};
