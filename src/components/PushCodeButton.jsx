import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_PAT,
});

export const PushCodeButton = () => {
  const code = "Testing creating a txt file with octokit!";

  const handleClick = async () => {
    try {
      const response = await octokit.request(
        "PUT /repos/kwankaley/client/contents/scripts/test_txt_file.txt",
        {
          owner: "kwankaley",
          repo: "client",
          path: "scripts/test_txt_file.txt",
          message: "Pushing txt file with the click of a button",
          committer: {
            name: "Kaley Kwan",
            email: "kaley@aira-technology.com",
          },
          content: btoa(code),
          branch: "test-snyk",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
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
