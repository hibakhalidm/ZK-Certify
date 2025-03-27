import { render, screen, fireEvent } from "@testing-library/react";
import CredentialForm from "../components/CredentialForm";
import { ethers } from "ethers";

jest.mock("ethers");

describe("CredentialForm", () => {
    let contract;

    beforeEach(() => {
        contract = {
            connect: jest.fn().mockReturnThis(),
            issueCredential: jest.fn().mockResolvedValue({ wait: jest.fn() }),
        };
    });

    it("should issue a credential", async () => {
        render(<CredentialForm contract={contract} />);

        fireEvent.change(screen.getByPlaceholderText("Student ID"), { target: { value: "student1" } });
        fireEvent.change(screen.getByPlaceholderText("Degree Type"), { target: { value: "degree1" } });
        fireEvent.change(screen.getByPlaceholderText("University ID"), { target: { value: "university1" } });

        fireEvent.click(screen.getByText("Issue Credential"));

        expect(contract.issueCredential).toHaveBeenCalled();
    });
});